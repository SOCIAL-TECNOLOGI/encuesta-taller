// Este es el formulario de tu encuesta de satisfacción
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        
        {/* Logo o encabezado de la institución */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
            FE
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Encuesta de Satisfacción</h1>
          <p className="text-gray-500 mt-1">Taller Pedagógico - Institución Educativa</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Aquí empieza el formulario */}
        <form className="space-y-6">
          {/* Pregunta 1: Nombre (Opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">1. Tu nombre (opcional)</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Escribe tu nombre" />
          </div>

          {/* Pregunta 2: Satisfacción General */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">2. ¿Cómo calificas el taller en general?</label>
            <div className="flex gap-4 flex-wrap">
              {['Muy Malo', 'Malo', 'Regular', 'Bueno', 'Excelente'].map((texto) => (
                <label key={texto} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="satisfaccion" className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">{texto}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pregunta 3: Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">3. El contenido del taller fue relevante para ti</label>
            <div className="flex gap-4 flex-wrap">
              {['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'].map((texto) => (
                <label key={texto} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="contenido" className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700 text-sm">{texto}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pregunta 4: Exposición del docente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">4. ¿Cómo fue la claridad del docente al explicar?</label>
            <div className="flex gap-4 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="docente" className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">{num}</span>
                </label>
              ))}
              <span className="text-sm text-gray-400 ml-2">(1=Confuso, 5=Muy claro)</span>
            </div>
          </div>

          {/* Pregunta 5: Comentarios abiertos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">5. Déjanos tus sugerencias o comentarios</label>
            <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Escribe aquí..."></textarea>
          </div>

          {/* Botón de enviar */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
            Enviar Encuesta
          </button>
          
          <p className="text-xs text-center text-gray-400 mt-4">Tus respuestas son anónimas y nos ayudan a mejorar</p>
        </form>
      </div>
    </div>
  );
}