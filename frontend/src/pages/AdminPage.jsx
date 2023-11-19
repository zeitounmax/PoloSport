import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold mb-6 text-white">
        Page administrateur
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/addvideos"
          className="flex flex-col items-center justify-center bg-white bg-opacity-75 p-4 rounded-xl shadow-md hover:bg-opacity-85 transition"
        >
          <AiFillFileAdd size={50} color="black" />
          <p className="mt-2 text-lg font-medium">Ajouter une vidéo</p>
        </Link>
        <Link
          to="/editvideos"
          className="flex flex-col items-center justify-center bg-white bg-opacity-75 p-4 rounded-xl shadow-md hover:bg-opacity-85 transition"
        >
          <FaEdit size={50} color="black" />
          <p className="mt-2 text-lg font-medium">Modifier une vidéo</p>
        </Link>
        <Link
          to="/deletevideos"
          className="flex flex-col items-center justify-center bg-white bg-opacity-75 p-4 rounded-xl shadow-md hover:bg-opacity-85 transition"
        >
          <FaTrash size={50} color="black" />
          <p className="mt-2 text-lg font-medium">Supprimer des vidéos</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
