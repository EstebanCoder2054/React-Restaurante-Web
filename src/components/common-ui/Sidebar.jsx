import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return ( 
        <div className="md:w-2/5 xl:w-1/5 bg-indigo-900">
            <div className="p-6">
                <p className="uppercase text-white text-2xl text-center font-bold">
                    Gran Buñuelo
                </p>

                <p className="mt-3 text-gray-500 text-center">Administrador de restaurante</p>

                <nav className="mt-5">
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact to="/">Órdenes</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact to="/menu">Menú</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact to="nuevo-platillo">Nuevo Platillo</NavLink>
                </nav>
            </div>
        </div>
     );
}
 
export default Sidebar;