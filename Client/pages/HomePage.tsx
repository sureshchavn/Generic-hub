import React, { useState, useMemo, useEffect } from 'react';
import { useMedicines } from '../context/MedicineContext';
import MedicineCard from '../components/MedicineCard';
import { Medicine } from '../types';
import Modal from '../components/Modal';
import MedicineQuickView from '../components/MedicineQuickView';
import { useAuth } from '../context/AuthContext';
import {
    Search,
    ArrowLeftRight,
    MapPin,
    ShieldCheck,
    Info,
    X,
    Sparkles,
    // Added icons for categories
    Heart,
    Droplet,
    Wind,
    Brain,
    Thermometer,
    Activity
} from 'lucide-react';
import API from '@/src/api';

const HomePage: React.FC = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); // New State
    const [quickViewMedicine, setQuickViewMedicine] = useState<Medicine | null>(null);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        if (user && sessionStorage.getItem('welcome_shown') !== 'true') {
            setShowWelcome(true);
            sessionStorage.setItem('welcome_shown', 'true');
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/medicines");

                const formatted = Array.isArray(res.data)
                    ? res.data.map((m: any) => ({
                        ...m,
                        id: m._id
                    }))
                    : [];

                setMedicines(formatted);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);


    // CATEGORY DATA
    const categories = [
        { name: 'All', icon: <Activity size={20} />, color: 'bg-blue-500' },
        { name: 'Heart', icon: <Heart size={20} />, color: 'bg-red-500' },
        { name: 'Diabetes', icon: <Droplet size={20} />, color: 'bg-orange-500' },
        { name: 'Respiratory', icon: <Wind size={20} />, color: 'bg-sky-500' },
        { name: 'Neurology', icon: <Brain size={20} />, color: 'bg-purple-500' },
        { name: 'Pain Relief', icon: <Thermometer size={20} />, color: 'bg-amber-500' },
    ];

    // Updated filtering logic to handle both search and category
    const filteredMedicines = useMemo(() => {
        return medicines.filter((med: any) => {
            const search = searchTerm.toLowerCase();

            const matchesSearch =
                !searchTerm ||
                med?.name?.toLowerCase()?.includes(search) ||
                med?.genericName?.toLowerCase()?.includes(search) ||
                med?.manufacturer?.toLowerCase()?.includes(search);

            const matchesCategory =
                selectedCategory === "All" || med?.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [medicines, searchTerm, selectedCategory]);
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-950">

            {/* Floating Welcome Message */}
            {showWelcome && user?.fullName && (
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
                    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 border-l-4 border-teal-500 flex items-center gap-4 max-w-sm">
                        <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-full text-teal-600">
                            <Sparkles size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-gray-900 dark:text-white">Welcome, {user.fullName}!</p>
                            <p className="text-xs text-gray-500">Find the best prices for your meds today.</p>
                        </div>
                        <button onClick={() => setShowWelcome(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* --- HERO SECTION --- */}
            <section className="relative pt-12 pb-20 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-6">
                                <ArrowLeftRight size={16} />
                                <span>Generic vs Brand Name Comparison</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6">
                                Smart Savings on <br />
                                <span className="text-teal-600 dark:text-teal-400">Your Essential Medicine</span>
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">
                                Don't overpay for brand names. Compare generic alternatives, see the price difference, and find which local pharmacies have them in stock.
                            </p>

                            {/* Search Bar */}
                            <div className="relative max-w-2xl mx-auto lg:mx-0 group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search medicine (e.g. Panadol, Metformin...)"
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-5 bg-white dark:bg-gray-800 border-none shadow-xl rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none dark:text-white text-lg transition-all"
                                />
                            </div>
                        </div>

                        {/* Hero Image Holder */}
                        <div className="flex-1 relative w-full max-w-xl">
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-200/50 dark:bg-teal-900/20 rounded-full blur-3xl -z-10"></div>
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 transform rotate-2">
                                <img
                                    src="src/assets/home.jpeg"
                                    alt="Pharmacy setup"
                                    className="w-full h-auto object-cover"
                                />
                                {/* Overlay info badge */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-teal-500 text-white p-2 rounded-lg"><ShieldCheck size={20} /></div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Independent Info</p>
                                            <p className="text-sm font-semibold dark:text-white">Updated store prices & stock levels</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS / STATS --- */}
            <section className="bg-white dark:bg-gray-900 py-12 border-y border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-blue-600"><Search size={24} /></div>
                            <div>
                                <h3 className="font-bold dark:text-white">1. Search</h3>
                                <p className="text-sm text-gray-500">Find any brand name medicine instantly.</p>
                            </div>
                        </div>
                        <a className="flex items-start gap-4" href="#/compare">
                            <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-xl text-teal-600"><ArrowLeftRight size={24} /></div>
                            <div>
                                <h3 className="font-bold dark:text-white">2. Compare</h3>
                                <p className="text-sm text-gray-500">See 100% equivalent generic alternatives.</p>
                            </div>
                        </a>
                        <a className="flex items-start gap-4" href="#/locator">
                            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl text-amber-600"><MapPin size={24} /></div>
                            <div>
                                <h3 className="font-bold dark:text-white">3. Locate</h3>
                                <p className="text-sm text-gray-500">Find the nearest store with the lowest price.</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* --- ADDED SECTION: DISEASE CATEGORIES --- */}
            <section className="container mx-auto px-6 pt-16">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">
                        Browse by Diseases
                    </h2>
                    <p className="text-gray-500 text-sm">Select a category to see specific medicine alternatives</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${selectedCategory === cat.name
                                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-600 shadow-md scale-105'
                                : 'border-transparent bg-white dark:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700 shadow-sm'
                                }`}
                        >
                            <div className={`mb-3 p-3 rounded-xl ${selectedCategory === cat.name ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400'}`}>
                                {cat.icon}
                            </div>
                            <span className="font-bold text-sm tracking-wide dark:text-gray-200">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </section>


            {/* --- MAIN CONTENT: MEDICINE LIST --- */}
            <main className="container mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {selectedCategory === 'All' ? 'Available Information' : `${selectedCategory} Medicines`}
                        </h2>
                        <p className="text-gray-500 mt-2">Browse the database for current pricing and store availability.</p>
                    </div>
                    <div className="text-sm font-medium px-4 py-2 bg-slate-200 dark:bg-gray-800 rounded-lg dark:text-gray-300">
                        Total Results: {filteredMedicines.length}
                    </div>
                </div>

                {filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredMedicines?.map((medicine: any) => (
                            <div key={medicine.id} className="transition-all duration-300 hover:scale-[1.02]">
                                <MedicineCard
                                    medicine={medicine}
                                    onQuickView={setQuickViewMedicine}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                        <div className="bg-slate-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Info className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">No medicine found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2">
                            We couldn't find any results for "{searchTerm}" in {selectedCategory}.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="mt-4 text-teal-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>

            {/* Quick View Modal */}
            <Modal
                isOpen={!!quickViewMedicine}
                onClose={() => setQuickViewMedicine(null)}
                title={quickViewMedicine?.name || 'Medicine Details'}
            >
                {quickViewMedicine && <MedicineQuickView medicine={quickViewMedicine} />}
            </Modal>

            {/* Footer Info */}
            <footer className="container mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-sm text-gray-500">
                    Disclaimer: This website is for informational purposes only. We do not sell medicine directly.
                    Always consult with a healthcare professional before switching medications.
                </p>
            </footer>
        </div>
    );
};

export default HomePage;