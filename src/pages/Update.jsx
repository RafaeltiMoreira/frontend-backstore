import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Api } from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Update() {
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const id = event.target.id.value;
    const stockUpdate = {
      name: event.target.name.value,
      image: event.target.image.value,
      quantity: parseInt(event.target.quantity.value),
      price: parseFloat(event.target.price.value)
    }

    if (!id) {
      toast.error("Insira o ID do produto.");
      return;
    }

    const apiUrl = Api.backstore.update(id)

    const response = await Api.buildApiPutRequest(apiUrl, stockUpdate)

    if (response && response.ok) {
      toast.success("Produto atualizado com sucesso!")
      navigate('/')
    } else {
      const body = await response.json()
      toast.error('Erro ao atualizar novo produto: ' + body.error)
    }
  }

  return (
    <div>
      <h1>Atualizar produto</h1>
      <div className="flex">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" placeholder="Insira o ID" required />
          </div>

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
            <button type="submit">Atualizar</button>
            <button type="reset">Reiniciar</button>
          </div>
        </form>
      </div>
    </div>
  )
}