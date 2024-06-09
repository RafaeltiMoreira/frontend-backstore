import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Api } from '../api/api'
import CardRemove from '../components/CardRemove/CardRemove'

export default function Remove() {
  const [products, setProducts] = useState([]);

  async function fetchData() {
    try {
      const apiUrl = Api.backstore.readAll();
      const response = await Api.buildApiGetRequest(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setProducts(data);

      } else {
        const error = await response.json();
        toast.error('Erro ao carregar produtos: ' + error.message);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast.error('Erro ao carregar produtos. Verifique sua conexão de rede.');
    }
  }

  async function handleRemove(id) {
    
    try {
      const apiUrl = Api.backstore.delete(id);
      const response = await Api.buildApiDeleteRequest(apiUrl, id);

      if (response.ok) {
        const updatedProducts = products.filter((item) => item._id !== id);
        setProducts(updatedProducts);
        toast.success('Produto removido com sucesso!');
      } else {
        const error = await response.json();
        toast.error('Erro ao remover produto: ' + error.message);
      }
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      toast.error('Erro ao remover produto. Verifique sua conexão de rede.');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Remover produto</h1>
      <div className='cards'>
        {products.map((product) => (
          <CardRemove key={product._id} item={product} onRemove={() => handleRemove(product._id)} />
        ))}
      </div>
    </>
  );
}