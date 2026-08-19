'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    claridad: 0,
    pertinencia: 0,
    rigurosidad: 0,
    brechas: [] as string[],
    modalidad: '',
    aporte: '',
    observacion: ''
  });

  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        if (checked) {
          return { ...prev, brechas: [...prev.brechas, value] };
        } else {
          return { ...prev, brechas: prev.brechas.filter(item => item !== value) };
        }
      });
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setExito(false);

    if (formData.claridad === 0 || formData.pertinencia === 0 || formData.rigurosidad === 0 || !formData.modalidad) {
      alert('Por favor, responde todas las preguntas obligatorias (Bloque 1 y Modalidad).');
      setEnviando(false);
      return;
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setExito(true);
        setFormData({
          nombre: '',
          claridad: 0,
          pertinencia: 0,
          rigurosidad: 0,
          brechas: [],
          modalidad: '',
          aporte: '',
          observacion: ''
        });
        const form = document.getElementById('survey-form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        alert('Hubo un error al enviar la encuesta. Intenta de nuevo.');
      }
    } catch (error) {
      alert('Error de conexión. Verifica tu internet.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-blue-700 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
            FE
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Valoración del Acompañamiento Curricular</h1>
          <p className="text-gray-500 mt-1">Diagnóstico de Necesidades Pedagógicas 2026</p>
          <div className="w-24 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></div>
          <p className="text-sm text-gray-400 mt-4">Duración: 3-5 min | Anónimo (salvo nombre opcional)</p>
        </div>

        <form id="survey-form" onSubmit={handleSubmit} className="space-y-8">

          {/* Bloque 1 */}
          <div className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Bloque 1: Valoración Técnica del Acompañamiento</h2>
            <p className="text-sm text-gray-500">Escala: 1 = Totalmente en desacuerdo | 5 = Totalmente de acuerdo</p>

            <div>
              <label className="block text-sm font-medium text-gray-700">1. Claridad Conceptual: Las jornadas brindaron herramientas claras para la transición a evaluación por competencias.</label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {[1,2,3,4,5].map(num => (
                  <label key={`c-${num}`} className="flex items-center gap-1">
                    <input type="radio" name="claridad" value={num} onChange={handleChange} className="h-4 w-4 text-blue-700" />
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">2. Pertinencia Institucional: El análisis de Bloom y Decreto 1290 responde a las necesidades reales de evaluación.</label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {[1,2,3,4,5].map(num => (
                  <label key={`p-${num}`} className="flex items-center gap-1">
                    <input type="radio" name="pertinencia" value={num} onChange={handleChange} className="h-4 w-4 text-blue-700" />
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">3. Rigurosidad y Metodología: El acompañamiento aportó el rigor técnico necesario para elevar la calidad académica.</label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {[1,2,3,4,5].map(num => (
                  <label key={`r-${num}`} className="flex items-center gap-1">
                    <input type="radio" name="rigurosidad" value={num} onChange={handleChange} className="h-4 w-4 text-blue-700" />
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Bloque 2 */}
          <div className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Bloque 2: Necesidades de Profundización y Gobernanza Curricular</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">4. ¿En cuál de los siguientes aspectos requiere MAYOR acompañamiento? (Selecciona los que apliquen)</label>
              <div className="mt-2 space-y-1">
                {['Comprensión de niveles intermedios de Bloom (N2/N3)', 'Criterios técnicos para aprobación/reprobación (Decreto 1290)', 'Diseño de rúbricas y preguntas tipo ICFES', 'Estructuración de mallas curriculares por competencias'].map(texto => (
                  <label key={texto} className="flex items-center gap-2">
                    <input type="checkbox" name="brechas" value={texto} onChange={handleChange} className="h-4 w-4 text-blue-700" />
                    <span className="text-sm">{texto}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">5. Modalidad de Acompañamiento Preferida:</label>
              <div className="mt-2 space-y-1">
                {['Programa de acompañamiento y consultoría permanente', 'Talleres aislados de entrega de formatos', 'Trabajo autónomo sin acompañamiento externo'].map(texto => (
                  <label key={texto} className="flex items-center gap-2">
                    <input type="radio" name="modalidad" value={texto} onChange={handleChange} className="h-4 w-4 text-blue-700" />
                    <span className="text-sm">{texto}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Bloque 3 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Bloque 3: Voz Directa del Docente</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">6. ¿Cuál considera que ha sido el hallazgo o aprendizaje más valioso?</label>
              <textarea name="aporte" rows={3} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Escribe aquí..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">7. Sugerencias para orientar el proceso pedagógico:</label>
              <textarea name="observacion" rows={3} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Escribe aquí..."></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre (opcional):</label>
              <input type="text" name="nombre" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Si prefieres el anonimato, déjalo en blanco." />
            </div>
          </div>

          <button type="submit" disabled={enviando} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50">
            {enviando ? 'Enviando...' : 'Enviar Encuesta'}
          </button>
          {exito && <p className="text-green-600 text-center font-medium">✅ ¡Respuesta enviada exitosamente! Muchas gracias.</p>}
        </form>
      </div>
    </div>
  );
}