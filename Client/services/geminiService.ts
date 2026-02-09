import { GoogleGenAI, GenerateContentResponse, Type, GroundingChunkMaps } from "@google/genai";
import { ShopLocation, UserLocation, GenericMedicine } from '../types';

declare global {
  interface Window {
    aistudio?: {
      openSelectKey: () => Promise<void>;
    };
  }
}

/**
 * Fetches generic medicine information from the Gemini API.
 * @returns A promise that resolves to a string containing information about generic medicines.     
 */
export async function getGenericMedicineInfo(): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY is not defined.');
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Provide a concise, easy-to-understand explanation of generic medicines. Explain what they are, why they are cheaper, and their effectiveness compared to branded drugs. Keep it under 200 words.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        maxOutputTokens: 250, // Set a reasonable token limit
      },
    });
    const text = response.text;
    if (!text) {
      throw new Error("No text found in Gemini response for generic medicine info.");
    }
    return text;
  } catch (error) {
    console.error('Error fetching generic medicine info from Gemini:', error);
    throw new Error(`Failed to fetch generic medicine information: ${(error as Error).message}`);
  }
}

/**
 * Finds nearby generic medical shops using the Gemini API with Google Maps grounding.
 * @param userLocation The user's current latitude and longitude.
 * @returns A promise that resolves to an array of ShopLocation objects.
 */
export async function findNearbyPharmacies(userLocation: UserLocation): Promise<ShopLocation[]> {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY is not defined.');
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Find generic medical shops or pharmacies near my location. Also, provide any available review snippets.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Maps grounding is supported in Gemini 2.5 series models
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }
          }
        }
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (!groundingChunks || groundingChunks.length === 0) {
      console.warn('No grounding chunks found for nearby pharmacies.');
      return [];
    }

    const shops: ShopLocation[] = [];
    for (const chunk of groundingChunks) {
      // Check if the chunk contains maps grounding data and narrow the type
      if (chunk.maps) {
        // Fix: Explicitly type placeSources as an array to resolve TypeScript error.
        const placeSources = Array.isArray(chunk.maps.placeAnswerSources) ? chunk.maps.placeAnswerSources : [];
        const reviewSnippets = placeSources
          .map((source: any) => source.reviewSnippets || [])
          .flat();

        shops.push({
          name: chunk.maps.title || 'Unknown Shop',
          // Access formattedAddress from the first placeAnswerSource, if available
          address: placeSources[0]?.place?.formattedAddress || 'Address not available',
          uri: chunk.maps.uri,
          reviewSnippets: reviewSnippets && reviewSnippets.length > 0 ? reviewSnippets : undefined,
          // Correctly access latLng from the place object within placeAnswerSources
          latitude: placeSources[0]?.place?.latLng?.latitude,
          longitude: placeSources[0]?.place?.latLng?.longitude,
        });
      }
    }
    return shops;

  } catch (error) {
    console.error('Error finding nearby pharmacies from Gemini:', error);
    if ((error as Error).message.includes("Requested entity was not found.")) {
      console.warn("Possible API key issue. Prompting user to re-select API key.");
      // Assume window.aistudio is available in this context for API key selection
      if (window.aistudio && window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
      }
    }
    throw new Error(`Failed to find nearby medical shops: ${(error as Error).message}`);
  }
}

/**
 * Fetches a list of common generic medicines with their details.
 * @returns A promise that resolves to an array of GenericMedicine objects.
 */
export async function getGenericMedicineDatabase(): Promise<GenericMedicine[]> {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY is not defined.');
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Generate ONLY a JSON array of 7 common generic medicines. Each medicine object should have the following properties: "name" (string, the generic name), "uses" (string, primary medical uses), "sideEffects" (string, common side effects), and "genericBrands" (array of strings, potential generic brand names). Ensure the response adheres strictly to the specified JSON schema and contains no additional text outside the JSON structure.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: 'The generic name of the medicine.' },
              uses: { type: Type.STRING, description: 'Primary medical uses of the medicine.' },
              sideEffects: { type: Type.STRING, description: 'Common side effects.' },
              genericBrands: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'List of potential generic brand names.',
              },
            },
            required: ['name', 'uses', 'sideEffects', 'genericBrands'],
            propertyOrdering: ['name', 'uses', 'sideEffects', 'genericBrands'],
          },
        },
        maxOutputTokens: 2048, // Increased tokens for more robust JSON generation
        thinkingConfig: { thinkingBudget: 256 }, // Allocate some tokens for thinking
      },
    });

    let jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error("No JSON response found for generic medicine database.");
    }

    // Robustly extract JSON array in case the model adds extra text
    const jsonMatch = jsonStr.match(/\[.*\]/s); // Use /s for single line mode to match newlines
    if (jsonMatch && jsonMatch[0]) {
      jsonStr = jsonMatch[0];
    } else {
      console.warn("Could not find a valid JSON array structure in the response. Attempting raw parse.", jsonStr);
      // Fallback: if regex fails, try parsing the raw string.
    }

    const medicines: GenericMedicine[] = JSON.parse(jsonStr);
    return medicines;
  } catch (error) {
    console.error('Error fetching generic medicine database from Gemini:', error);
    if ((error as Error).message.includes("Requested entity was not found.")) {
      console.warn("Possible API key issue. Prompting user to re-select API key.");
      if (window.aistudio && window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
      }
    }
    throw new Error(`Failed to fetch generic medicine database: ${(error as Error).message}`);
  }
}

/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 * @param lat1 Latitude of point 1.
 * @param lon1 Longitude of point 1.
 * @param lat2 Latitude of point 2.
 * @param lon2 Longitude of point 2.
 * @returns Distance in kilometers.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}