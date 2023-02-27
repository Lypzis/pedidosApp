import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Cliente from "@/Components/Cliente";
import { Head, Link } from "@inertiajs/react";

export default function Index({ clientes }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Clientes
                </h2>
            }
        >
            <Head title="Clientes" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {clientes && clientes.length > 0 ? (
                        clientes.map((cliente) => (
                            <Cliente key={cliente.id} cliente={cliente} />
                        ))
                    ) : (
                        <div>
                            <p>Nenhum cliente ainda, que tal criar alguns?</p>
                        </div>
                    )}
                    <Link
                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        href="/clientes_cadastro"
                    >
                        Cadastrar Cliente
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
