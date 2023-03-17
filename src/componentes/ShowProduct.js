
import React, { useState} from "react"
import { show_alerta } from "../functions"
import { productos } from "./DB"
import "./ancho.css"
import "./../App.css"


const ShowProduct =() => {
    const[products, setProducts] = useState(productos);
    const [id, setId] = useState('')
    const [name, setName] = useState('');
    const [description, setDescripction] = useState('');
    const [price, setPrice] = useState('');
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState(''); 

    const productoNew= {
        id:id,
        producto: name ,
        descripcion:description,
        precio:price ,
    }
      const openModal = (op, id, name, description, price) => {

        setId('');
        setName('');
        setDescripction('');
        setPrice('');
        setOperation(op);

        if(op === 1){
            setTitle('Registrar producto')
            
        }else if(op === 2){
            setTitle('Editar producto')
            setName(name);
            setDescripction(description);
            setPrice(price);
            setId(id)
        }
        window.setTimeout( ()=> {
            document.getElementById('nombre').focus()
        },500)
    }
    const validar = () => {

        if(name.trim() === ''){
            show_alerta('Escribe el nombre de tu producto', 'warning')
        }
        else if(description.trim()=== ''){
            show_alerta('Describe el producto', 'warning')
        }else if(price.trim()=== ''){
            show_alerta('Escribre el precio del producto', 'warning')
        }else {
                   agregarProducto() 
                  
        }

        
    } 
    const agregarProducto = ()=> {

        
        if(operation === 1){
            setProducts([
                ...products,
                {
                id: Date.now(),
                producto:name ,
                descripcion:description,
                precio:price ,
            }
            ])
            
               
             show_alerta('producto agregado','success')
            
        }else if(operation === 2 ){

          const hay = products.find(producto => producto.id === productoNew.id)  
          const indice = products.indexOf(hay)
          if(hay){ 
        products.splice(indice,1, productoNew);
         setProducts([...products])

       
          }
          
             show_alerta('producto actualizado','success')  
            
             
           } 
           document.getElementById('btnCerrar').click()              
        }
        
        const eliminarProducto = (id) => {

             const productoBorrado =  products.filter( productos => productos.id !== id)
             setProducts(productoBorrado)
             
        }

      

    return(
        <div className="mono">

            <h1 className="App ">CRUD de inventario telefonico</h1>
        
            <div className="container">
              
          
            <div className="row">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table id="tabla" className="table table-bordered  mt-3 mb-5">
                            <thead>
                                <tr className="text-center text-light table-dark">
                                    <th>n°</th><th>Producto</th><th>Description</th><th>Precio</th><th>Editar</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {products.map( ({id, producto,descripcion, precio}, i)=>(
                                    <tr className="bg-light" key={id + producto }>
                             
                                        <td>{i+1}</td>
                                        <td className="producto">{producto}</td>
                                        <td className="ancho">{descripcion}</td>
                                        <td>{precio}$</td>
                                        <td>
                                            <button onClick={()=>{ openModal(2,id,producto, descripcion,precio )}} className="btn btn-warning icon" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                                <i className="fa-solid fa-edit"></i>
                                            </button>
                                            &nbsp;
                                            <button onClick={() => eliminarProducto(id)} className="btn btn-danger">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>

            <div id="modalProducts" className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{title}</label>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id="nombre" className="form-control" placeholder="Nombre" value={name} onChange={(e)=> setName(e.target.value)}></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-comment"></i></span>
                                <input type="text" id="descripcion" className="form-control" placeholder="Descripcion" value={description} onChange={(e)=> setDescripction(e.target.value)}></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-dollar-sign"></i></span>
                                <input type="number" id="precio" className="form-control" placeholder="Precio" value={price} onChange={(e)=> setPrice(e.target.value)}></input>
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                <button onClick={()=> validar()} className="btn btn-success">
                                    <i className="fa-solid fa-floppy-disk"></i> Guardar
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" id="btnCerrar"className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button></div>
                    </div>
                </div>
            </div>    
            { products.length < 1 && <h3 className="App">El inventario esta vacio agrega un producto </h3>  }
            <div className="row  fixed-bottom bg-dark bg-gradient p-2" >
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">              
                        <button onClick={()=>{ openModal(1)}} className="btn btn-light" data-bs-toggle="modal" data-bs-target="#modalProducts">
                            <i className="fa-solid fa-circle-plus"></i> Agregar
                        </button>
                        </div>   
                    </div>
                </div>
        </div>
        
    )
}
export default ShowProduct

