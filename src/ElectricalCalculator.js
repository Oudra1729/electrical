import React, { useState } from 'react';

const taillesModules = {
  Disjoncteur: {
    'Disjoncteur 1P': 1,
    'Disjoncteur 1P+N': 2,
    'Disjoncteur 3P': 3,
    'Disjoncteur 3P+N': 4,
  },
  'Disjoncteur MCCB': {
    'Disjoncteur MCCB 3P': 8,
    'Disjoncteur MCCB 4P': 10,
  },
  'Disjoncteur Différentiel': {
    'Disjoncteur Différentiel 1P+N': 2,
    'Disjoncteur différentiel 2P': 2,
    'Disjoncteur Différentiel 3P+N': 4,
  },
  Interrupteur: {
    'Interrupteur 1P': 1,
    'Interrupteur 1P+N': 2,
    'Interrupteur 3P': 3,
    'Interrupteur 3P+N': 4,
  },
};

const CalculateurModules = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [quantity, setQuantity] = useState('');
  const [components, setComponents] = useState([]);
  const [totalModules, setTotalModules] = useState(0);

  const handleAddComponent = () => {
    if (selectedCategory && selectedComponent && quantity) {
      const moduleSize = taillesModules[selectedCategory][selectedComponent];
      const newComponent = {
        category: selectedCategory,
        component: selectedComponent,
        quantity: parseInt(quantity),
        modules: moduleSize * quantity,
      };
      setComponents([...components, newComponent]);
      setTotalModules(totalModules + newComponent.modules);
      setSelectedCategory('');
      setSelectedComponent('');
      setQuantity('');
    }
  };

  const handleRemoveComponent = (indexToRemove) => {
    const updatedComponents = components.filter((_, index) => index !== indexToRemove);
    const removedModules = components[indexToRemove].modules;
    setTotalModules(totalModules - removedModules);
    setComponents(updatedComponents);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-8">Calculateur de Modules</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie de Composant</label>
          <select
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            {Object.keys(taillesModules).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Composant</label>
          <select
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">Sélectionner un composant</option>
            {selectedCategory &&
              Object.keys(taillesModules[selectedCategory]).map((component) => (
                <option key={component} value={component}>
                  {component}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantité</label>
          <input
            type="number"
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleAddComponent}
          >
            Ajouter Composant
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Composants Ajoutés</h2>
        <ul className="list-disc pl-5 space-y-2">
          {components.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {item.category} - {item.component} (Quantité : {item.quantity}) : {item.modules} modules
              </span>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleRemoveComponent(index)}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-xl font-bold">
          Total des Modules : {totalModules} modules
        </div>
      </div>
    </div>
  );
};

export default CalculateurModules;
