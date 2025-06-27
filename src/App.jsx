import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [activeTab, setActiveTab] = useState('diet');
  const [dietItems, setDietItems] = useState([]);
  const [exerciseItems, setExerciseItems] = useState([]);
  const [sleepEntries, setSleepEntries] = useState([]);

  const totalMacros = dietItems.reduce(
    (totals, item) => {
      return {
        kcal: totals.kcal + Number(item.kcal || 0),
        carbs: totals.carbs + Number(item.carbs || 0),
        protein: totals.protein + Number(item.protein || 0),
        fat: totals.fat + Number(item.fat || 0)
      };
    },
    { kcal: 0, carbs: 0, protein: 0, fat: 0 }
  );

  // Handlers for CRUD
  const addDiet = () => {
    setDietItems([...dietItems, { id: Date.now(), name: '', kcal: 0, carbs: 0, protein: 0, fat: 0 }]);
  };
  const updateDiet = (id, field, value) => {
    setDietItems(dietItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const deleteDiet = id => {
    setDietItems(dietItems.filter(item => item.id !== id));
  };

  const addExercise = () => {
    setExerciseItems([...exerciseItems, { id: Date.now(), name: '', weight: 0, reps: 0, completed: false }]);
  };
  const updateExercise = (id, field, value) => {
    setExerciseItems(exerciseItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const deleteExercise = id => {
    setExerciseItems(exerciseItems.filter(item => item.id !== id));
  };
  const toggleComplete = id => {
    setExerciseItems(
      exerciseItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addSleep = () => {
    setSleepEntries([
      ...sleepEntries,
      { id: Date.now(), sleepTime: '', wakeTime: '', insomniaHours: 0, notes: '' }
    ]);
  };
  const updateSleep = (id, field, value) => {
    setSleepEntries(
      sleepEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };
  const deleteSleep = id => {
    setSleepEntries(sleepEntries.filter(entry => entry.id !== id));
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; }
        .container { display: flex; height: 100vh; }
        .sidebar { width: 200px; background: #f4f4f4; padding: 10px; }
        .sidebar button { width: 100%; margin-bottom: 10px; padding: 10px; border: none; cursor: pointer; }
        .sidebar button:hover { background: #ddd; }
        .main { flex: 1; padding: 20px; }
        h2 { margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        table, th, td { border: 1px solid #ccc; }
        th, td { padding: 8px; text-align: left; }
        .completed { background: #d4edda; }
        .add-btn, .delete-btn, .complete-btn { margin-right: 5px; }
      `}</style>
      <div className="container">
        <div className="sidebar">
          <button onClick={() => setActiveTab('diet')}>Dieta</button>
          <button onClick={() => setActiveTab('exercise')}>Ejercicio</button>
          <button onClick={() => setActiveTab('sleep')}>Sueño</button>
        </div>
        <div className="main">
          {activeTab === 'diet' && (
            <div>
              <h2>Dieta</h2>
              <table>
                <thead>
                  <tr>
                    <th>Alimento</th><th>kcal</th><th>Carbs</th><th>Proteína</th><th>Grasa</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {dietItems.map(item => (
                    <tr key={item.id}>
                      <td><input value={item.name} onChange={e => updateDiet(item.id, 'name', e.target.value)} /></td>
                      <td><input type="number" value={item.kcal} onChange={e => updateDiet(item.id, 'kcal', e.target.value)} /></td>
                      <td><input type="number" value={item.carbs} onChange={e => updateDiet(item.id, 'carbs', e.target.value)} /></td>
                      <td><input type="number" value={item.protein} onChange={e => updateDiet(item.id, 'protein', e.target.value)} /></td>
                      <td><input type="number" value={item.fat} onChange={e => updateDiet(item.id, 'fat', e.target.value)} /></td>
                      <td><button className="delete-btn" onClick={() => deleteDiet(item.id)}>Eliminar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Total: {totalMacros.kcal} kcal, {totalMacros.carbs}g carbs, {totalMacros.protein}g proteína, {totalMacros.fat}g grasa</p>
              <button className="add-btn" onClick={addDiet}>Agregar Alimento</button>
            </div>
          )}

          {activeTab === 'exercise' && (
            <div>
              <h2>Ejercicio</h2>
              <table>
                <thead>
                  <tr>
                    <th>Ejercicio</th><th>Peso</th><th>Reps</th><th>Estado</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {exerciseItems.map(item => (
                    <tr key={item.id} className={item.completed ? 'completed' : ''}>
                      <td><input value={item.name} onChange={e => updateExercise(item.id, 'name', e.target.value)} /></td>
                      <td><input type="number" value={item.weight} onChange={e => updateExercise(item.id, 'weight', e.target.value)} /></td>
                      <td><input type="number" value={item.reps} onChange={e => updateExercise(item.id, 'reps', e.target.value)} /></td>
                      <td>{item.completed ? 'Completado' : 'Pendiente'}</td>
                      <td>
                        <button className="complete-btn" onClick={() => toggleComplete(item.id)}>Marcar</button>
                        <button className="delete-btn" onClick={() => deleteExercise(item.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="add-btn" onClick={addExercise}>Agregar Ejercicio</button>
            </div>
          )}

          {activeTab === 'sleep' && (
            <div>
              <h2>Sueño</h2>
              <table>
                <thead>
                  <tr>
                    <th>Dormir</th><th>Despertar</th><th>Insomnio (h)</th><th>Notas</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sleepEntries.map(entry => (
                    <tr key={entry.id}>
                      <td><input type="time" value={entry.sleepTime} onChange={e => updateSleep(entry.id, 'sleepTime', e.target.value)} /></td>
                      <td><input type="time" value={entry.wakeTime} onChange={e => updateSleep(entry.id, 'wakeTime', e.target.value)} /></td>
                      <td><input type="number" value={entry.insomniaHours} onChange={e => updateSleep(entry.id, 'insomniaHours', e.target.value)} /></td>
                      <td><input value={entry.notes} onChange={e => updateSleep(entry.id, 'notes', e.target.value)} /></td>
                      <td><button className="delete-btn" onClick={() => deleteSleep(entry.id)}>Eliminar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="add-btn" onClick={addSleep}>Agregar Sueño</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

