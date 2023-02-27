import React from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function PedidosCadastro({
    pedido,
    pedidoStatus,
    clientes,
    creating,
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
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

    const submit = (event) => {
        event.preventDefault();
        creating();
        post(route("pedidos.store"), {
            onSuccess: () => reset(),
        });
    };

    const onStatusChange = (event) => {
        setData("pedido__statuses_id", event.target.value);
    };

    const onClienteChange = (event) => {
        setData("cliente_id", event.target.value);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
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
                        step={".01"}
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
                    <select onChange={onClienteChange} value={data.cliente_id}>
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
                            setData("ativo", event.target.checked ? 1 : 0)
                        }
                    />
                </label>
                <InputError message={errors.message} className="mt-2" />
                <PrimaryButton
                    className="mt-4"
                    processing={processing.toString()}
                >
                    Cadastrar
                </PrimaryButton>
            </form>
        </div>
    );
}
