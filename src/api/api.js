import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export const Api = {
  baseUrl: 'https://backend-para-integrar-com-frontend.onrender.com/',

  backstore: {
    endpoint: function () {
      return Api.baseUrl + 'backstore'
    },
    readAll: function () {
      return this.endpoint() + '/'
    },
    create: function () {
      return this.endpoint() + '/'
    },
    sale: function (id) {
      return `${this.endpoint()}/${id}/sale`;
    },
    update: function (id) {
      return `${this.endpoint()}/${id}`;
    },
    delete: function (id) {
      return `${this.endpoint()}/${id}`;
    }
  },

  buildApiGetRequest: function (url) {
    return fetch(url, { method: 'GET' }).catch(function (error) {
      console.error('Erro ao carregar dados.' + url, error)
      toast.error('Erro ao carregar dados da API.')
    })
  },

  buildApiPostRequest: function (url, body) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .catch(function (error) {
        console.error('Erro ao enviar dados.' + url, error)
        toast.error('Erro ao enviar dados.')
      })
  },

  buildApiPatchRequest: function (url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .catch(function (error) {
        console.error('Erro ao atualizar dados.' + url, error);
        toast.error('Erro ao atualizar dados.');
      });
  }
}