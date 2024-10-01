
import './App.css';
import ItemsList from './components/ItemsList';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">CRUD with MongoDB, React, and Redux Toolkit</h1>
      <ItemsList />
    </div>
  );
}

export default App;
