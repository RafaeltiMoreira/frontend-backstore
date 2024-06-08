import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Api } from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Remove() {
  const navigate = useNavigate()
  
  async function handleSubmit(event) {
    event.preventDefault()

    const stock = {
      name: event.target.name.value,
      image: event.target.image.value,
      quantity: parseInt(event.target.quantity.value),
      price: parseFloat(event.target.price.value)
    }

    const apiUrl = Api.backstore.delete()

    const response = await Api.buildApiPostRequest(apiUrl, stock)

    if (response.ok) {
      toast.success("Produto removido com sucesso!")
      navigate('/')
    } else {
      const body = await response.json()
      toast.error('Erro ao remover produto: ' + body.error)
    }
  }

  return (
    <div>
      <h1>Remover produto</h1>
      <div className="flex">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder="Insira o nome" required />
          </div>

          <div>
            <label htmlFor="image">Imagem (URL):</label>
            <input type="text" id="image" name="image" placeholder="Insira a URL da imagem" required />
          </div>

          <div>
            <label htmlFor="quantity">Quantidade:</label>
            <input type="number" id="quantity" name="quantity" placeholder="Insira a quantidade do produto" required />
          </div>

          <div>
            <label htmlFor="price">Preço:</label>
            <input type="number" step="0.01" id="price" name="price" placeholder="Insira o preço do produto" required />
          </div>

          <div className="btn">
            <button type="submit">Remover</button>
            <button type="reset">Reiniciar</button>
          </div>
        </form>
      </div>
    </div>
  )
}