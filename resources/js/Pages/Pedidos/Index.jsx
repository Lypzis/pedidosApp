import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pedido from "@/Components/Pedido/Pedido";
import PedidoCadastro from "@/Components/Pedido/PedidoCadastro";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
// import { CSVLink } from "react-csv";

export default function Index({
    pedidos,
    pedido__statuses,
    pedido_imagem,
    clientes,
}) {
    const [creating, setCreating] = useState(false);

    // bugged :(
    // const csvReady = () => {
    //     if (pedidos.length > 0) {
    //         const header = Object.keys(pedidos[0]).map((key) => key);

    //         console.log(header);

    //         const body = pedidos.map((pedido) => Object.values(pedido));

    //         console.log(body);
    //     }
    // };

    // const [csvData, setCsvData] = useState(csvReady());

    const updateCreating = () => {
        setCreating(!creating);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pedidos
                </h2>
            }
        >
            <Head title="Pedidos" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {clientes && clientes.length === 0 ? (
                        <div>
                            <p>
                                Cadastre pelo menos 1 cliente antes de poder
                                cadastrar pedidos.
                            </p>
                        </div>
                    ) : (
                        <>
                            {creating && (
                                <PedidoCadastro
                                    pedidoStatus={pedido__statuses}
                                    clientes={clientes}
                                    creating={updateCreating}
                                />
                            )}
                            {pedidos && pedidos.length > 0 ? (
                                pedidos.map((pedido) => (
                                    <Pedido
                                        key={pedido.id}
                                        pedido={pedido}
                                        pedidoStatus={pedido__statuses}
                                        pedidoImagem={pedido_imagem}
                                        clientes={clientes}
                                    />
                                ))
                            ) : (
                                <div>
                                    <p>
                                        Nenhum pedido ainda, que tal criar
                                        alguns?
                                    </p>
                                </div>
                            )}
                            <PrimaryButton onClick={() => setCreating(true)}>
                                Cadastrar Pedido
                            </PrimaryButton>
                            {/* <CSVLink data={csvData}>Baixar Pedidos</CSVLink>; */}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
