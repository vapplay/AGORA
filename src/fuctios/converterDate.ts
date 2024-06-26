function ConverteDate(fechaStr: string, formato: string): string {
  try {
      // Convertir la cadena de caracteres a un objeto de fecha
      const fecha = new Date(fechaStr);
      // Obtener el día y el mes en números
      const dia = fecha.getDate();
      const mes = fecha.getMonth();
      // Definir los nombres de mes en español
      const nombresMes = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      // Verificar el formato deseado
      if (formato === 'DD de mes') {
          // Devolver la fecha en el formato "DD de mes"
          return `${dia < 10 ? '0' + dia : dia} de ${nombresMes[mes]}`;
      } else if (formato === 'DD mesAbr') {
          // Devolver la fecha en el formato "DD mesAbr"
          return `${dia < 10 ? '0' + dia : dia} ${nombresMes[mes].substring(0, 3)}`;
      } else {
          // Formato no válido
          console.error("Error: Formato de fecha no válido. Utilice 'DD de mes' o 'DD mesAbr'.");
          return '';
      }
  } catch (error) {
      console.error("Error: Formato de fecha inválido. Utilice el formato YYYY-MM-DD.");
      return '';
  }
}

  
export default ConverteDate;
