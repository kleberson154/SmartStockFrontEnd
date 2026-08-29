import { AlertTriangle, Boxes, PackageCheck } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
      <p className="mt-2 text-slate-600">Visão geral do estoque.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total de Produtos"
          value={128}
          description="Produtos cadastrados"
          icon={<Boxes />}
        />
        <StatCard
          title="Estoque baixo"
          value={7}
          description="Produtos precisam de atenção"
          icon={<AlertTriangle />}
        />
        <StatCard
          title="Movimentações"
          value={342}
          description="Entradas e saídas registradas"
          icon={<PackageCheck />}
        />
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Estoque baixo
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Produtos que precisam de atenção
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <p className="font-medium text-slate-900">Mouse Logitech</p>

              <p className="text-sm font-medium text-red-600">
                2 unidades
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <p className="font-medium text-slate-900">
                Teclado Mecânico
              </p>

              <p className="text-sm font-medium text-red-600">
                3 unidades
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <p className="font-medium text-slate-900">Headset HyperX</p>

              <p className="text-sm font-medium text-red-600">
                1 unidade
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Movimentações recentes
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Entradas e saídas registradas
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-emerald-600">
                  Entrada
                </p>

                <p className="font-medium text-slate-900">
                  Teclado Mecânico
                </p>
              </div>

              <p className="font-semibold text-emerald-600">+10</p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-red-600">
                  Saída
                </p>

                <p className="font-medium text-slate-900">
                  Mouse Logitech
                </p>
              </div>

              <p className="font-semibold text-red-600">-3</p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <p className="text-sm font-medium text-emerald-600">
                  Entrada
                </p>

                <p className="font-medium text-slate-900">
                  Headset HyperX
                </p>
              </div>

              <p className="font-semibold text-emerald-600">+5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
