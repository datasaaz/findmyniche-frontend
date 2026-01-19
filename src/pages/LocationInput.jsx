import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Target, ArrowLeft, MapPin, Search, Check, TrendingUp, Users, Star, AlertTriangle, ChevronRight } from "lucide-react";

export function LocationCategoryInput() {
  const navigate = useNavigate();
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  const [categoryInput, setCategoryInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [selectedRefinements, setSelectedRefinements] = useState([]);

  // Mock location suggestions
  const locationSuggestions = [
    { name: "Cambridge", region: "Cambridgeshire, UK", country: "United Kingdom" },
    { name: "Cambridge", region: "Massachusetts", country: "United States" },
    { name: "Camden", region: "London", country: "United Kingdom" },
    { name: "Canterbury", region: "Kent", country: "United Kingdom" },
  ];

  // Category suggestions
  const categoryOptions = [
    "Restaurant",
    "Café",
    "Fast Food",
    "Grocery Store",
    "Fitness / Gym",
    "Retail Store",
    "Coffee Shop",
    "Bakery",
    "Bar / Pub",
    "Beauty Salon",
  ];

  const getRefinementOptions = () => {
    if (selectedCategory.toLowerCase().includes("restaurant") || 
        selectedCategory.toLowerCase().includes("food") ||
        selectedCategory.toLowerCase().includes("café") ||
        selectedCategory.toLowerCase().includes("coffee")) {
      return [
        "Vegetarian / Vegan",
        "Fast Casual",
        "Premium / Fine Dining",
        "Delivery-first",
        "Late-night",
        "Family-friendly",
      ];
    }
    return [
      "Premium / Luxury",
      "Budget-friendly",
      "Family-oriented",
      "Tech-forward",
      "Eco-conscious",
      "Local / Independent",
    ];
  };

  const handleLocationSelect = (location) => {
    const fullLocation = `${location.name}, ${location.region}, ${location.country}`;
    setSelectedLocation(fullLocation);
    setLocationInput(fullLocation);
    setShowLocationDropdown(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryInput(category);
  };

  const toggleRefinement = (refinement) => {
    if (selectedRefinements.includes(refinement)) {
      setSelectedRefinements(selectedRefinements.filter(r => r !== refinement));
    } else {
      if (selectedRefinements.length < 2) {
        setSelectedRefinements([...selectedRefinements, refinement]);
      }
    }
  };

  const handleCreateReport = () => {
    if (selectedLocation && selectedCategory) {
      navigate("/preview", {
        state: {
          location: selectedLocation,
          category: selectedCategory,
          refinements: selectedRefinements,
        },
      });
    }
  };

  const isComplete = selectedLocation && selectedCategory;

  const filteredCategories = categoryInput.trim() === ""
    ? categoryOptions
    : categoryOptions.filter(cat => 
        cat.toLowerCase().includes(categoryInput.toLowerCase())
      );

  const filteredLocations = locationInput.trim() === ""
    ? locationSuggestions
    : locationSuggestions.filter(loc => 
        loc.name.toLowerCase().includes(locationInput.toLowerCase()) ||
        loc.region.toLowerCase().includes(locationInput.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-gray-600 border-gray-300">
                Guest user
              </Badge>
              <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 bg-white border border-gray-200 shadow-sm">
              <div className="mb-6">
                <Badge className="mb-3 bg-blue-100 text-blue-700 border-blue-200">
                  Step 1
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Choose a location
                </h2>
                <p className="text-gray-600">
                  Search for a city, neighborhood, or specific place.
                </p>
              </div>

              <div className="relative">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter a city, area, or place (e.g. 'Cambridge, UK')"
                    value={locationInput}
                    onChange={(e) => {
                      setLocationInput(e.target.value);
                      setShowLocationDropdown(true);
                      if (e.target.value === "") setSelectedLocation("");
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                    className="pl-12 pr-12 h-14 text-base border-2"
                  />
                  {selectedLocation && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  )}
                </div>

                {showLocationDropdown && locationInput && !selectedLocation && (
                  <Card className="absolute top-full mt-2 w-full border border-gray-200 shadow-lg z-10 bg-white">
                    <div className="py-2">
                      {filteredLocations.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{location.name}</div>
                            <div className="text-sm text-gray-500">
                              {location.region}, {location.country}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </Card>

            <div className={`transition-all duration-500 ${selectedLocation ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <Card className="p-8 bg-white border border-gray-200 shadow-sm">
                <div className="mb-6">
                  <Badge className="mb-3 bg-purple-100 text-purple-700 border-purple-200">
                    Step 2
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Select a business category
                  </h2>
                  <p className="text-gray-600">
                    What type of business or market are you exploring?
                  </p>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Start typing a category (e.g. Restaurant, Gym, Coffee Shop)"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      disabled={!selectedLocation}
                      className="pl-12 h-14 text-base border-2"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Suggested categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filteredCategories.slice(0, 8).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        disabled={!selectedLocation}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className={`transition-all duration-500 ${selectedCategory ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <Card className="p-8 bg-white border border-gray-200 shadow-sm">
                <div className="mb-6">
                  <Badge className="mb-3 bg-green-100 text-green-700 border-green-200">
                    Optional
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Refine your niche
                  </h2>
                  <p className="text-gray-600">
                    Narrow down your analysis for more precise insights.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getRefinementOptions().map((refinement) => {
                    const isSelected = selectedRefinements.includes(refinement);
                    const isDisabled = !isSelected && selectedRefinements.length >= 2;
                    
                    return (
                      <button
                        key={refinement}
                        onClick={() => toggleRefinement(refinement)}
                        disabled={!selectedCategory || isDisabled}
                        className={`p-4 rounded-lg text-sm font-medium transition-all border-2 ${
                          isSelected
                            ? 'bg-green-50 border-green-500 text-green-800'
                            : isDisabled
                            ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50/50'
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-green-600 mb-1" />
                        )}
                        {refinement}
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleCreateReport}
                disabled={!isComplete}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg"
              >
                Create market report
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  What we'll analyze
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Competition density</div>
                      <div className="text-sm text-gray-600">How saturated is the market</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Review sentiment</div>
                      <div className="text-sm text-gray-600">Customer satisfaction signals</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
