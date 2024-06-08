import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Api } from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Remove() {
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const id = event.target.id.value;

    if (!id) {
      toast.error("Por favor, forneça o ID do produto.");
      return;
    }

    const apiUrl = Api.backstore.delete()

    const response = await Api.buildApiDeleteRequest(apiUrl)

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
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" placeholder="Insira o ID" required />
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