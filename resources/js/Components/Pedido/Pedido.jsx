import React, { useState } from "react";
import Dropdown from "../Dropdown";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";
import PedidoImagem from "./PedidoImage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm } from "@inertiajs/react";

dayjs.extend(relativeTime);

export default function Pedido({
    pedido,
    pedidoStatus,
    pedidoImagem,
    clientes,
}) {
    const [editing, setEditing] = useState(false);
    const [addingImage, setAddingImage] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        produto: pedido && pedido.produto ? pedido.produto : "",
        valor: pedido && pedido.valor ? pedido.valor : 0,
        data: pedido && pedido.data ? pedido.data : "",
        cliente_id: pedido && pedido.cliente_id ? pedido.cliente_id : 1,
        pedido__statuses_id:
            pedido && pedido.pedido__statuses_id
                ? pedido.pedido__statuses_id
                : 3,
        ativo: pedido && pedido.ativo ? pedido.ativo : 0,
    });

    const findInArray = (arr, id, expectedProp) => {
        const result = arr.filter((item) => item.id === id)[0];
        const def = { [`${expectedProp}`]: "" };

        if (typeof result !== "undefined") {
            return result[`${expectedProp}`];
        }

        return def[`${expectedProp}`];
    };

    // these wont update until changing page and coming back
    const [statusDescricao, setDescricao] = useState(
        findInArray(pedidoStatus, data.pedido__statuses_id, "descricao")
    );
    const [clienteNome, setClienteNome] = useState(
        findInArray(clientes, data.cliente_id, "nome")
    );
    //

    const submit = (event) => {
        event.preventDefault();
        patch(route("pedido.update", pedido.id), {
            onSuccess: () => setEditing(false),
        });
    };

    const onStatusChange = (event) => {
        setData("pedido__statuses_id", event.target.value);
    };

    const onClienteChange = (event) => {
        setData("cliente_id", event.target.value);
    };

    return (
        <div className="p-6 flex space-x-2">
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">
                            Produto: {pedido.id}
                        </span>
                    </div>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button
                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                onClick={() => setEditing(true)}
                            >
                                Editar
                            </button>
                            <Dropdown.Link
                                as="button"
                                href={route("pedidos.destroy", pedido.id)}
                                method="delete"
                            >
                                Deletar
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                <PedidoImagem
                    pedidoImagem={pedidoImagem}
                    pedidoId={pedido.id}
                    addingImage={addingImage}
                    setAddingImage={setAddingImage}
                />

                {editing ? (
                    <form
                        onSubmit={submit}
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <label>
                            Produto:{" "}
                            <input
                                name="produto"
                                maxLength={255}
                                value={data.produto}
                                required
                                onChange={(event) =>
                                    setData("produto", event.target.value)
                                }
                            />
                        </label>
                        <label>
                            Valor:{" "}
                            <input
                                name="valor"
                                min={0}
                                type={"number"}
                                value={data.valor}
                                required
                                onChange={(event) =>
                                    setData("valor", event.target.value)
                                }
                            />
                        </label>
                        <label>
                            Data:{" "}
                            <input
                                type={"date"}
                                name="data"
                                value={data.data}
                                required
                                onChange={(event) =>
                                    setData("data", event.target.value)
                                }
                            />
                        </label>
                        <label>
                            Cliente:{" "}
                            <select
                                onChange={onClienteChange}
                                value={data.cliente_id}
                            >
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Status:{" "}
                            <select
                                onChange={onStatusChange}
                                value={data.pedido__statuses_id}
                            >
                                {pedidoStatus.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.descricao}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Ativo:{" "}
                            <input
                                type={"checkbox"}
                                name="ativo"
                                checked={data.ativo === 1}
                                required
                                onChange={(event) =>
                                    setData(
                                        "ativo",
                                        event.target.checked ? 1 : 0
                                    )
                                }
                            />
                        </label>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="mt-4 text-lg text-gray-900">
                            Produto: {pedido.produto}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            Valor: $ {pedido.valor.toFixed(2)}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            Data: {pedido.data}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            Status: {statusDescricao}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            Cliente: {clienteNome}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            Ativo: {pedido.ativo === 1 ? "ativo" : "inativo"}
                        </p>
                        <PrimaryButton
                            className="mt-4"
                            onClick={() => setAddingImage(true)}
                        >
                            Adicionar/Editar Imagem
                        </PrimaryButton>
                    </>
                )}
            </div>
        </div>
    );
}

// add react style on page ?
