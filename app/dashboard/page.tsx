'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { format } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF', '#FF6B6B'];

interface Respuesta {
  id: string;
  nombre?: string;
  ritmoAprendizaje: number;
  brechaAndamiaje: number;
  criteriosDecreto1290: number;
  liderazgo: string;
  requerimientos: string;
  obstaculoAula: string;
  comparativaAsesores: string;
  loQueMasGusto: string;
  recomendacion: string;
  mensajeInstitucion: string;
  fecha: string;
}

export default function Dashboard() {
  const [data, setData] = useState<Respuesta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard-data')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar datos');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-600">Cargando datos...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  if (data.length === 0) return <div className="p-8 text-center text-gray-600">No hay respuestas aún.</div>;

  const conteo = (campo: keyof Respuesta) => {
    const counts: Record<string, number> = {};
    data.forEach(item => {
      const val = String(item[campo] || '');
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const promedios = [
    { name: 'Ritmo Aprendizaje', value: data.reduce((acc, d) => acc + d.ritmoAprendizaje, 0) / data.length },
    { name: 'Brecha Andamiaje', value: data.reduce((acc, d) => acc + d.brechaAndamiaje, 0) / data.length },
    { name: 'Criterios Decreto 1290', value: data.reduce((acc, d) => acc + d.criteriosDecreto1290, 0) / data.length },
  ];

  const liderazgoData = conteo('liderazgo');
  const requerimientosData = conteo('requerimientos');
  const comparativaData = conteo('comparativaAsesores');
  const recomendacionData = conteo('recomendacion');

  // ✅ CORREGIDO: agrupa las respuestas por día real, sumando cuántas
  // llegaron cada fecha — antes cada respuesta se marcaba como "1"
  // suelto, sin agrupar, dando una línea plana sin sentido.
  const conteoPorFecha: Record<string, number> = {};
  data.forEach(d => {
    const dia = format(new Date(d.fecha), 'dd/MM');
    conteoPorFecha[dia] = (conteoPorFecha[dia] || 0) + 1;
  });
  const timelineData = Object.keys(conteoPorFecha)
    .sort((a, b) => {
      const [da, ma] = a.split('/').map(Number);
      const [db, mb] = b.split('/').map(Number);
      return ma - mb || da - db;
    })
    .map(fecha => ({ fecha, count: conteoPorFecha[fecha] }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Dashboard de la Encuesta</h1>
        <p className="text-gray-500 mb-6">Total de respuestas: <span className="font-semibold">{data.length}</span></p>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bloque 1: Promedio de escalas Likert</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={promedios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">4. Tipo de Liderazgo</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={liderazgoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {liderazgoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">5. Requerimientos Institucionales</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={requerimientosData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">7. Comparativa de Impacto</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={comparativaData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {comparativaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">9. Recomendación Profesional</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={recomendacionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {recomendacionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📝 Respuestas abiertas (Bloque 3)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Obstáculo</th>
                  <th className="px-4 py-2 text-left">Lo que más gustó</th>
                  <th className="px-4 py-2 text-left">Mensaje a la Institución</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.slice().reverse().map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 font-medium">{item.nombre || 'Anónimo'}</td>
                    <td className="px-4 py-2 max-w-xs truncate">{item.obstaculoAula}</td>
                    <td className="px-4 py-2 max-w-xs truncate">{item.loQueMasGusto}</td>
                    <td className="px-4 py-2 max-w-xs truncate">{item.mensajeInstitucion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📈 Respuestas en el tiempo</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
