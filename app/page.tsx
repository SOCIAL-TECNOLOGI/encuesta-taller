'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    ritmoAprendizaje: 0,
    brechaAndamiaje: 0,
    criteriosDecreto1290: 0,
    liderazgo: '',
    requerimientos: '',
    obstaculoAula: '',
    mensajeInstitucion: ''
  });

  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setExito(false);

    if (formData.ritmoAprendizaje === 0 || formData.brechaAndamiaje === 0 || formData.criteriosDecreto1290 === 0 || !formData.liderazgo || !formData.requerimientos) {
      alert('Por favor, responde todas las preguntas obligatorias (Bloque 1 y Bloque 2).');
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
          ritmoAprendizaje: 0,
          brechaAndamiaje: 0,
          criteriosDecreto1290: 0,
          liderazgo: '',
          requerimientos: '',
          obstaculoAula: '',
          mensajeInstitucion: ''
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
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-blue-700 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
            FE
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Diagnóstico de Realidades Pedagógicas</h1>
          <p className="text-gray-500 mt-1">Progresión Cognitiva y Gobernanza Curricular 2026</p>
          <div className="w-24 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></div>
          <p className="text-sm text-gray-400 mt-4">Duración: 3-5 min | Anónimo (salvo nombre opcional)</p>
        </div>

        <form id="survey-form" onSubmit={handleSubmit} className="space-y-8">

          {/* BLOQUE 1 */}
          <div className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Bloque 1: La Realidad de la Progresión Cognitiva en el Aula</h2>
            <p className="text-sm text-gray-500">Escala: 1 = Totalmente en desacuerdo | 5 = Totalmente de acuerdo</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-justify">
                <strong>1. Ritmo Real de Aprendizaje:</strong> Considero que para lograr una transformación real en la evaluación por competencias (DCE), el cuerpo docente necesita consolidar primero los niveles de comprensión y aplicación (N2/N3 de Bloom) antes de pasar al diseño definitivo de instrumentos de alta complejidad (N5/N6) equivalentes a N3/N4 según el SIEE.
              </label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {[1,2,3,4,5].map(num => (
                  <label key={`r-${num}`} className="flex items-center gap-1">
                    <input type="radio" name="ritmoAprendizaje" value={num} onChange={handleChange} className="h-4 w-4 text-blue-700" />
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-justify">
                <strong>2. Brecha de Andamiaje:</strong> Intentar pasar de manera inmediata de actividades de identificación/descripción al diseño y elaboración de pruebas complejas, sin un acompañamiento intermedio, genera sobrecarga y riesgo de adopción superficial de la norma (llenar formatos por cumplir).
              </label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {[1,2,3,4,5].map(num => (
                  <label key={`b-${num}`} className="flex items-center gap-1">
                    <input type="radio" name="brechaAndamiaje" value={num} onChange={handleChange} className="h-4 w-4 text-blue-700" />
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-justify">
                <strong>3. Criterios del Decreto 1290:</strong> Para determinar con rigor cuándo un estudiante aprueba o reprueba legalmente en el Nivel Básico (Decreto 1290), requiero mayor profundización técnica en la definición de evidencias de aprendizaje.
              </label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {[1,2,3,4,5].map(num => (
                  <label key={`d-${num}`} className="flex items-center gap-1">
                    <input type="radio" name="criteriosDecreto1290" value={num} onChange={handleChange} className="h-4 w-4 text-blue-700" />
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* BLOQUE 2 */}
          <div className="space-y-4 border-b pb-6 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Bloque 2: La Realidad del Acompañamiento Directivo y la Gobernanza</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-justify">
                <strong>4. Tipo de Liderazgo Requerido:</strong> Para que el proceso de reestructuración curricular no se quede en un trámite administrativo, las diferentes Coordinaciones de la institución deben enfocar su rol en:
              </label>
              <div className="mt-2 space-y-1">
                {[
                  'Opción A: El control formal de procesos, fechas de entrega, norma y seguimiento académico (Gestión Académica Estructural).',
                  'Opción B: El diseño didáctico, el modelamiento pedagógico en aula y el acompañamiento en la matriz DCE (Gestión Pedagógica) con fechas de entrega, norma y seguimiento.'
                ].map(texto => (
                  <label key={texto} className="flex items-start gap-2 cursor-pointer text-sm text-gray-700 text-justify">
                    <input type="radio" name="liderazgo" value={texto} onChange={handleChange} className="mt-1 h-4 w-4 text-blue-700 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: texto.replace(/^(Opción [A-B]:)/, '<strong>$1</strong>') }} />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-justify">
                <strong>5. Requerimientos Institucionales:</strong> Frente a las exigencias de entregar planeaciones de aula y mallas reestructuradas bajo la metodología DCE, mi percepción es que:
              </label>
              <div className="mt-2 space-y-1">
                {[
                  'Se requiere un programa de acompañamiento y consultoría permanente que comprenda la curva de aprendizaje real del equipo, evitando así el riesgo de diligenciar formatos de forma algorítmica sin una verdadera aprehensión pedagógica en el aula.',
                  'Se puede continuar con la entrega intensiva de formatos, asumiendo el riesgo de que el diligenciamiento sea puramente administrativo.',
                  'El cuerpo docente puede asumir el rediseño de mallas de manera autónoma sin necesidad de asesoría técnica externa.'
                ].map(texto => (
                  <label key={texto} className="flex items-start gap-2 cursor-pointer text-sm text-gray-700 text-justify">
                    <input type="radio" name="requerimientos" value={texto} onChange={handleChange} className="mt-1 h-4 w-4 text-blue-700 flex-shrink-0" />
                    <span>{texto}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* BLOQUE 3 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Bloque 3: La Voz Directa de la Realidad Institucional</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-justify">
                <strong>6. La Realidad del Aula:</strong> ¿Cuál es el principal obstáculo o dificultad real que usted experimenta hoy en el aula al intentar pasar de la enseñanza tradicional por contenidos a la evaluación basada en evidencias (DCE)?
              </label>
              <textarea name="obstaculoAula" rows={3} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Escribe aquí..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-justify">
                <strong>7. Mensaje a la Institución:</strong> Desde su experiencia en el aula, ¿qué ajuste urgente debe hacer la institución en el ritmo y la forma para que el proceso de aprendizaje docente se vea fortalecido?
              </label>
              <textarea name="mensajeInstitucion" rows={3} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Escribe aquí..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <strong>Nombre (opcional):</strong>
              </label>
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