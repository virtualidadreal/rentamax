// =============================================================================
// GUIAS "COMO PEDIR" DEDUCCIONES - RENTA 2025
// Extraido de investigacion exhaustiva (13 abril 2026)
// Fuentes: AEAT, BOE, portales tributarios autonomicos
// =============================================================================

export interface HowToClaim {
  categoryId: string;
  title: string;
  isAutomatic: boolean;
  casillas: string[];
  steps: string[];
  documents: string[];
  commonMistakes: string[];
  tips: string[];
  deadline?: string;
}

export interface GeneralGuide {
  title: string;
  content: string;
}

// =========================================================================
// GUIA POR CATEGORIA DE DEDUCCION
// =========================================================================

export const howToClaimByCategory: Record<string, HowToClaim> = {
  familia: {
    categoryId: "familia",
    title: "Deducciones familiares",
    isAutomatic: false,
    casillas: ["0611", "0613", "0660+"],
    steps: [
      "Accede a Renta Web con certificado digital, Cl@ve o numero de referencia",
      "Ve a 'Apartados declaracion' > 'Deducciones por maternidad y familia'",
      "Revisa que tus hijos, ascendientes y situacion familiar aparecen correctamente",
      "Si tienes hijos menores de 3 anos, verifica la deduccion por maternidad (casilla 0611)",
      "Si usas guarderia, comprueba el incremento por guarderia (casilla 0613)",
      "Para familia numerosa o discapacidad a cargo, ve a 'Deducciones por familia numerosa o personas con discapacidad a cargo' (casilla 0660+)",
      "Si cobras el pago anticipado (Modelo 140 o 143), verifica que el importe anticipado esta correctamente reflejado para evitar duplicidades",
    ],
    documents: [
      "Libro de familia o certificado de nacimiento",
      "Vida laboral actualizada (acredita alta en Seguridad Social)",
      "Titulo de familia numerosa en vigor (si aplica)",
      "Certificado de discapacidad >= 33% (si aplica)",
      "Modelo 233 de la guarderia (declaracion informativa del centro)",
      "Convenio regulador (si separados/divorciados con custodia compartida)",
    ],
    commonMistakes: [
      "Solicitar la deduccion por maternidad y el pago anticipado sin verificar que no se duplique",
      "No renovar el titulo de familia numerosa (tiene fecha de caducidad)",
      "No coordinar entre conyuges quien aplica la deduccion",
      "Olvidar que el certificado de discapacidad debe estar en vigor durante el ejercicio 2025",
      "No verificar que el centro infantil esta autorizado por la Comunidad Autonoma",
    ],
    tips: [
      "El pago anticipado de maternidad (100 EUR/mes) se solicita con el Modelo 140 en la Sede Electronica",
      "Para familia numerosa, el pago anticipado se solicita con el Modelo 143",
      "Si hay varios beneficiarios (matrimonio), decidid si la deduccion es individual o colectiva",
      "La deduccion por familia monoparental con 2 hijos sin derecho a anualidades es de 1.200 EUR",
    ],
  },

  vivienda: {
    categoryId: "vivienda",
    title: "Deducciones por vivienda",
    isAutomatic: false,
    casillas: ["0547", "0548", "0562", "0563"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones generales de la cuota'",
      "Para vivienda habitual (hipoteca pre-2013): busca 'Deduccion por inversion en vivienda habitual' y verifica casillas 0547 (estatal) y 0548 (autonomica)",
      "Para alquiler (contrato pre-2015): busca 'Deduccion por alquiler de vivienda habitual' e introduce el NIF del arrendador y cantidades pagadas en casillas 0562 y 0563",
      "Comprueba que la base de deduccion por vivienda no supere 9.040 EUR anuales",
      "Si pagas seguros vinculados a la hipoteca (vida, hogar), analos manualmente ya que no suelen venir en el borrador",
    ],
    documents: [
      "Certificado bancario con desglose anual: capital amortizado + intereses + gastos",
      "Escritura de compraventa (para verificar fecha pre-2013)",
      "Facturas de seguros vinculados a la hipoteca (vida, hogar)",
      "Contrato de alquiler (para verificar fecha pre-2015)",
      "Recibos de pago del alquiler de todo 2025",
      "NIF del arrendador",
      "Declaracion de Renta del ano anterior (para verificar aplicacion previa)",
    ],
    commonMistakes: [
      "Olvidar incluir los seguros vinculados a la hipoteca (vida, hogar obligatorio)",
      "No verificar que se aplico la deduccion antes de 2013 (pierdes el derecho transitorio)",
      "Superar la base maxima de 9.040 EUR en deduccion por vivienda",
      "Incluir gastos de una segunda residencia (solo aplica a vivienda HABITUAL)",
      "Intentar aplicar la deduccion de alquiler con contrato posterior a 2015",
      "No declarar el NIF del arrendador (es obligatorio)",
    ],
    tips: [
      "Los datos de la hipoteca suelen venir del banco, pero los seguros vinculados hay que meterlos a mano",
      "Para alquiler, el limite de base imponible es 24.107,20 EUR (casilla 0435 + 0460)",
      "La deduccion por vivienda es del 15% (7,5% estatal + 7,5% autonomica), maximo 1.356 EUR",
      "La deduccion por alquiler transitoria es del 10,05% de las cantidades pagadas",
    ],
  },

  trabajo: {
    categoryId: "trabajo",
    title: "Deducciones por rendimientos del trabajo",
    isAutomatic: false,
    casillas: ["0414", "0044"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones generales'",
      "IMPORTANTE: Busca la casilla 0414 para la deduccion de 340 EUR por baja renta (NO es automatica)",
      "Pulsa el lapiz de edicion junto a la casilla 0414",
      "Comprueba que tus rendimientos del trabajo estan entre 16.576 y 18.276 EUR",
      "Confirma la deduccion marcando la casilla",
      "Si tienes indemnizacion por despido, verifica en casilla 0044 que solo aparece la parte NO exenta",
    ],
    documents: [
      "Certificado de retenciones del trabajo de todos los pagadores",
      "Datos fiscales descargados de la AEAT",
      "Certificado de empresa (si hubo despido, con desglose parte exenta y no exenta)",
      "Carta de despido y acta de conciliacion (si aplica)",
    ],
    commonMistakes: [
      "NO marcar la casilla 0414 de los 340 EUR (el error mas frecuente y grave, Hacienda NO lo aplica automaticamente)",
      "Asumir que todas las deducciones de trabajo son automaticas",
      "No verificar el limite de 6.500 EUR en otras rentas para la deduccion de 340 EUR",
      "No comprobar que la indemnizacion por despido esta correctamente desglosada (parte exenta vs no exenta)",
    ],
    tips: [
      "Si ya presentaste sin marcar la casilla 0414, puedes hacer una autoliquidacion rectificativa",
      "Las prestaciones de maternidad/paternidad estan 100% exentas, verifica que no aparezcan como rendimiento",
      "Si tienes varios pagadores, suma TODOS los certificados de retenciones para verificar",
    ],
  },

  inversiones: {
    categoryId: "inversiones",
    title: "Deducciones por inversiones",
    isAutomatic: false,
    casillas: ["0711", "0712", "0713", "0714"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones generales de la cuota'",
      "Busca 'Deduccion por inversion en empresas de nueva o reciente creacion'",
      "Introduce en casilla 0711 el NIF de la empresa",
      "Introduce en casilla 0712 la cantidad invertida",
      "Si invertiste en mas de una empresa, usa casillas 0713 y 0714 para la segunda",
      "El sistema calculara el 50% de deduccion automaticamente",
    ],
    documents: [
      "Certificado de deduccion emitido por la startup (OBLIGATORIO)",
      "Escritura de ampliacion de capital ante notario",
      "Justificante de pago (transferencia bancaria)",
      "Estatutos de la sociedad (para verificar forma juridica SA, SL, SAL o SLL)",
    ],
    commonMistakes: [
      "No obtener el certificado de deduccion de la empresa (sin el, no puedes deducir)",
      "Invertir en una empresa que no cumple requisitos (cotizada, antiguedad > 5 anos, etc.)",
      "Confundir prestamos con suscripcion de acciones (solo deducen acciones/participaciones)",
      "Vender las acciones antes de 3 anos (pierdes la deduccion)",
    ],
    tips: [
      "La deduccion es del 50% de las cantidades invertidas, con base maxima de 100.000 EUR",
      "La deduccion maxima es de 50.000 EUR",
      "La empresa debe tener menos de 5 anos de antiguedad (7 para ciertos sectores) y menos de 400.000 EUR de facturacion",
      "Debes mantener las acciones al menos 3 anos para conservar la deduccion",
    ],
  },

  donaciones: {
    categoryId: "donaciones",
    title: "Deducciones por donativos",
    isAutomatic: true,
    casillas: ["0723"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones generales de la cuota'",
      "Busca 'Deducciones por donativos y otras aportaciones' > Anexo A.1",
      "Verifica que aparecen tus donaciones (las ONGs suelen informar a Hacienda)",
      "Si falta alguna donacion, pulsa 'Anadir' e introduce: NIF de la entidad, nombre, importe donado",
      "Marca si es recurrente (3+ anos donando a la misma entidad) para obtener el 45% en vez del 40%",
      "El resultado se refleja en la casilla 0723",
    ],
    documents: [
      "Certificado fiscal de cada ONG/entidad (lo emiten en enero-febrero)",
      "Justificante de transferencia bancaria o recibo de la donacion",
      "El certificado debe incluir: NIF donante, NIF entidad, importe, fecha, destino",
    ],
    commonMistakes: [
      "No verificar si la donacion ya aparece en el borrador (a veces falta)",
      "Donar a una entidad NO acogida a la Ley 49/2002 y pretender deducir",
      "No guardar el certificado fiscal (Hacienda puede pedirlo en comprobacion)",
      "Olvidar marcar la recurrencia para obtener el 45% en vez del 40%",
    ],
    tips: [
      "Primeros 250 EUR donados: 80% de deduccion (te devuelven 200 EUR)",
      "Resto por encima de 250 EUR: 40% de deduccion (45% si llevas 3+ anos)",
      "Limite global: 10% de la base liquidable",
      "Pide el certificado fiscal a la ONG si no te lo han enviado antes de febrero",
      "La mayoria de ONGs lo envian automaticamente por email",
    ],
  },

  discapacidad: {
    categoryId: "discapacidad",
    title: "Deducciones por discapacidad",
    isAutomatic: false,
    casillas: ["0660+"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Datos identificativos' y verifica que aparece tu grado de discapacidad",
      "Si no aparece, anadelo con el numero de certificado",
      "Ve a 'Deducciones por familia numerosa o personas con discapacidad a cargo'",
      "Indica el grado de discapacidad, si necesitas ayuda de tercera persona, y si tienes movilidad reducida",
      "Para deducciones AUTONOMICAS, ve ademas a 'Deducciones autonomicas' y marca las de discapacidad de tu CCAA (NO son automaticas)",
    ],
    documents: [
      "Certificado de discapacidad (minimo 33%) emitido por la CCAA o IMSERSO",
      "Resolucion de incapacidad permanente de la Seguridad Social (si aplica)",
      "Libro de familia (si la discapacidad es de hijo/ascendiente a cargo)",
    ],
    commonMistakes: [
      "Asumir que si el grado aparece en el borrador, las deducciones autonomicas ya estan aplicadas (NO es asi)",
      "No verificar que el certificado de discapacidad esta en vigor durante 2025",
      "Olvidar marcar las deducciones autonomicas adicionales por discapacidad",
    ],
    tips: [
      "Si tienes pension de incapacidad permanente total/absoluta, Hacienda suele tener los datos",
      "Pero las deducciones autonomicas adicionales SIEMPRE hay que marcarlas manualmente",
      "El minimo por discapacidad se acumula al minimo personal: 3.000 EUR (33-65%) o 9.000 EUR (>= 65%)",
      "Si necesitas ayuda de tercera persona: 3.000 EUR adicionales",
    ],
  },

  educacion: {
    categoryId: "educacion",
    title: "Deducciones por gastos educativos",
    isAutomatic: false,
    casillas: [],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones autonomicas'",
      "Busca las deducciones educativas de tu CCAA (varian por comunidad)",
      "Introduce el NIF del centro educativo",
      "Desglosa los importes pagados por concepto: ensenanza, libros, uniformes, idiomas, extraescolares",
      "Indica el numero de hijos beneficiarios",
      "En algunas CCAA: tipo de centro (publico/privado/concertado)",
    ],
    documents: [
      "Facturas oficiales del centro educativo a nombre del contribuyente",
      "Certificado anual del centro con resumen de gastos del curso",
      "Recibos de pago con desglose claro del concepto",
      "Justificante de pago bancario (transferencia, tarjeta, domiciliacion)",
    ],
    commonMistakes: [
      "Pagar gastos educativos en efectivo (NO da derecho a deduccion)",
      "No pedir factura oficial al centro sino solo recibos genericos",
      "Incluir gastos no contemplados en tu CCAA (varia segun comunidad)",
    ],
    tips: [
      "El pago en efectivo NO se admite: usa tarjeta, transferencia o cheque nominativo",
      "Las CCAA con deduccion educativa incluyen: Madrid, Andalucia, Aragon, Asturias, Baleares, Canarias, CLM, CyL, Extremadura, Murcia, Valencia",
      "Pide al colegio un certificado anual de gastos, la mayoria ya los emiten",
      "Tras la Sentencia TS 8/2024, las guarderias privadas se equiparan a las publicas para la deduccion estatal",
    ],
  },

  salud: {
    categoryId: "salud",
    title: "Deducciones por gastos de salud",
    isAutomatic: false,
    casillas: [],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones autonomicas'",
      "Busca deducciones de salud de tu CCAA (solo algunas las tienen)",
      "Introduce el NIF del profesional medico/sanitario",
      "Introduce el importe de cada servicio sanitario",
      "Verifica los limites de tu CCAA (varian entre 500 y 700 EUR)",
    ],
    documents: [
      "Facturas de profesionales medicos/sanitarios a nombre del contribuyente",
      "Recibos de optica (gafas graduadas, lentillas)",
      "Justificantes de pago bancario (NO efectivo)",
    ],
    commonMistakes: [
      "Incluir gastos de farmacia (generalmente NO deducibles)",
      "Pagar en efectivo (solo medios bancarios)",
      "No verificar si tu CCAA tiene deduccion por salud (solo algunas la ofrecen)",
    ],
    tips: [
      "Canarias tiene la deduccion de salud mas amplia: consultas, tratamientos, dental, optica",
      "Limite habitual: 500 EUR individual / 700 EUR conjunta",
      "Pide factura oficial al profesional sanitario, no solo ticket",
      "La farmacia generalmente NO es deducible en ninguna CCAA",
    ],
  },

  eficiencia_energetica: {
    categoryId: "eficiencia_energetica",
    title: "Deducciones por eficiencia energetica",
    isAutomatic: false,
    casillas: ["0567", "1655-1662", "1663-1670", "1671-1679"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones generales de la cuota'",
      "Busca 'Deducciones por obras de mejora de la eficiencia energetica'",
      "Selecciona el tipo: reduccion demanda calefaccion (20%), mejora consumo energia (40%), o rehabilitacion edificio (60%)",
      "Introduce la referencia catastral del inmueble",
      "Introduce las cantidades pagadas por las obras",
      "Introduce los datos del certificado de eficiencia energetica ANTERIOR a las obras",
      "Introduce los datos del certificado de eficiencia energetica POSTERIOR a las obras",
      "El sistema verifica que se cumple la reduccion minima (7%, 30%, o mejora a A/B)",
      "El resultado se acumula en la casilla 0567",
    ],
    documents: [
      "Certificado de eficiencia energetica (CEE) ANTES de las obras, registrado en la CCAA",
      "Certificado de eficiencia energetica (CEE) DESPUES de las obras, expedido antes del 1 enero 2028",
      "Ambos CEE registrados en el organismo competente de tu CCAA",
      "Facturas de las obras (materiales y mano de obra)",
      "Justificantes de pago por transferencia bancaria (NO efectivo)",
      "Licencia de obra si aplica",
    ],
    commonMistakes: [
      "No obtener el CEE ANTES de empezar las obras (sin el 'antes', no puedes demostrar la mejora)",
      "No registrar el CEE en el organismo de la CCAA",
      "Pagar en efectivo (debe ser transferencia bancaria)",
      "Confundir las tres deducciones y aplicar la incorrecta",
      "No verificar que la reduccion cumple el minimo requerido (7%, 30% o mejora a A/B)",
    ],
    tips: [
      "Reduccion demanda calefaccion/refrigeracion: 20%, base maxima 5.000 EUR, deduccion maxima 1.000 EUR",
      "Mejora consumo energia primaria no renovable: 40%, base maxima 7.500 EUR, deduccion maxima 3.000 EUR",
      "Rehabilitacion energetica edificios: 60%, base maxima 5.000 EUR/ano (15.000 EUR acumulado), deduccion maxima 3.000 EUR/ano",
      "Periodo: obras realizadas desde 6 octubre 2021 hasta 31 diciembre 2025",
    ],
    deadline: "CEE posterior debe expedirse antes del 1 enero 2028",
  },

  vehiculo_electrico: {
    categoryId: "vehiculo_electrico",
    title: "Deducciones por vehiculo electrico y punto de recarga",
    isAutomatic: false,
    casillas: ["0607", "1916-1927", "1929-1935"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones generales'",
      "Busca 'Deduccion por adquisicion de vehiculos electricos enchufables'",
      "Introduce la matricula del vehiculo, NIF del vendedor, y precio de compra",
      "Si recibiste subvencion del Plan MOVES, resta ese importe de la base de deduccion",
      "Para punto de recarga: busca 'Deduccion por instalacion de infraestructuras de recarga'",
      "Introduce los datos del inmueble donde se instalo y el coste de instalacion",
      "El resultado aparece en casilla 0607",
    ],
    documents: [
      "Factura de compra del vehiculo",
      "Ficha tecnica del vehiculo (para verificar que es electrico/enchufable)",
      "Matricula del vehiculo",
      "Resolucion del Plan MOVES si recibiste subvencion",
      "Factura de instalacion del punto de recarga",
      "Certificado del instalador autorizado",
      "Justificante de pago",
    ],
    commonMistakes: [
      "Incluir la subvencion del Plan MOVES en la base de deduccion (hay que restarla)",
      "Intentar deducir un vehiculo hibrido NO enchufable",
      "El punto de recarga debe estar en un inmueble de tu propiedad (no vale en alquiler)",
      "No tener factura desglosada de la instalacion del punto de recarga",
    ],
    tips: [
      "Vehiculo electrico: 15% del valor de adquisicion, base maxima 20.000 EUR, deduccion maxima 3.000 EUR",
      "Punto de recarga: 15% del coste de instalacion, base maxima 4.000 EUR, deduccion maxima 600 EUR",
      "Precio maximo del vehiculo: 45.000 EUR (vehiculos M1)",
      "Compra entre 30 junio 2023 y 31 diciembre 2025",
    ],
    deadline: "Vehiculo adquirido entre 30 junio 2023 y 31 diciembre 2025",
  },

  emprendimiento: {
    categoryId: "emprendimiento",
    title: "Deducciones por emprendimiento",
    isAutomatic: false,
    casillas: ["0711-0714"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Deducciones generales de la cuota'",
      "Busca 'Deduccion por inversion en empresas de nueva o reciente creacion'",
      "Introduce en casilla 0711 el NIF de la empresa",
      "Introduce en casilla 0712 la cantidad invertida",
      "Para segunda empresa: casillas 0713 y 0714",
      "El sistema calculara el 50% de deduccion",
    ],
    documents: [
      "Certificado de deduccion emitido por la startup (OBLIGATORIO)",
      "Escritura de ampliacion de capital",
      "Justificante de pago (transferencia bancaria)",
      "Estatutos de la sociedad",
    ],
    commonMistakes: [
      "No obtener el certificado de la empresa (sin el, no puedes deducir)",
      "Invertir en empresa que no cumple requisitos (cotizada, antiguedad, facturacion)",
      "Confundir prestamos con suscripcion de acciones",
      "Vender antes de 3 anos",
    ],
    tips: [
      "Deduccion del 50% con base maxima de 100.000 EUR (maxima deduccion: 50.000 EUR)",
      "La empresa debe ser SA, SL, SAL o SLL, no cotizada",
      "Antiguedad maxima: 5 anos (7 para ciertos sectores)",
      "Facturacion maxima: 400.000 EUR en ultimo ejercicio",
    ],
  },

  ahorro: {
    categoryId: "ahorro",
    title: "Reducciones por planes de pensiones",
    isAutomatic: true,
    casillas: ["0465", "462-476"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Reducciones de la base imponible'",
      "Busca 'Aportaciones y contribuciones a sistemas de prevision social'",
      "Verifica que aparece tu aportacion en la casilla 0465 (la gestora suele informar a Hacienda)",
      "Si falta o esta mal, modifica con el lapiz de edicion",
      "El sistema aplica los limites automaticamente",
    ],
    documents: [
      "Certificado de aportaciones de la gestora del plan (lo envian en enero-febrero)",
      "Extracto anual del plan con detalle de aportaciones",
    ],
    commonMistakes: [
      "Creer que puedes aportar y deducir cantidades ilimitadas (limite 1.500 EUR individual)",
      "No verificar que la gestora ha informado correctamente a Hacienda",
      "Olvidar que al rescatar el plan tributaras como rendimiento del trabajo",
      "No comprobar que las aportaciones empresariales al plan de empleo tambien aparecen",
    ],
    tips: [
      "Limite individual: 1.500 EUR o 30% de rendimientos netos (el menor)",
      "Limite adicional aportaciones empresariales: 8.500 EUR (total maximo 10.000 EUR)",
      "NO es una deduccion en cuota, sino una REDUCCION de la base imponible (mas ventajosa)",
      "El ahorro depende de tu tipo marginal: con tipo del 37%, aportar 1.500 EUR ahorra 555 EUR",
    ],
  },

  autonomo: {
    categoryId: "autonomo",
    title: "Gastos deducibles para autonomos",
    isAutomatic: false,
    casillas: ["0165-0180"],
    steps: [
      "Accede a Renta Web",
      "Ve a 'Apartados declaracion' > 'Rendimientos de actividades economicas'",
      "Indica el codigo IAE y metodo de estimacion (Directa Simplificada o Normal)",
      "Introduce tus ingresos en las casillas correspondientes",
      "Introduce los gastos deducibles por categorias: suministros, alquiler, telefono, material, etc.",
      "Si trabajas desde casa, aplica el 30% de la parte proporcional de suministros",
      "El sistema calcula el rendimiento neto (ingresos - gastos)",
      "Opcionalmente, importa los libros registro en formato Excel (XLS)",
    ],
    documents: [
      "Todas las facturas emitidas y recibidas de 2025",
      "Libros registro (ingresos, gastos, bienes de inversion)",
      "Modelos 130/131 trimestrales presentados",
      "Certificados de retenciones de clientes",
      "Recibo cuota de autonomos (Seguridad Social)",
    ],
    commonMistakes: [
      "No guardar TODAS las facturas (conservar minimo 4-5 anos)",
      "No deducir la cuota de autonomos (siempre deducible al 100%)",
      "Deducir el 100% de suministros trabajando desde casa (solo el 30% de la parte proporcional)",
      "No incluir los gastos de dificil justificacion (7% automatico, max 2.000 EUR en directa simplificada)",
    ],
    tips: [
      "Dietas: 26,67 EUR/dia en Espana (48,08 EUR en extranjero), con factura y pago electronico",
      "Vehiculo: solo 50% deducible si uso mixto, 100% si es herramienta exclusiva de trabajo",
      "Los Modelos 130/131 son anticipos: en la declaracion anual se ajusta todo",
      "Renta Web permite importar libros registro en formato Excel para trasladar totales automaticamente",
    ],
  },

  otros: {
    categoryId: "otros",
    title: "Otras deducciones",
    isAutomatic: false,
    casillas: [],
    steps: [
      "Accede a Renta Web",
      "Revisa la seccion de 'Deducciones autonomicas' para deducciones especificas de tu CCAA",
      "Comprueba si tu municipio tiene deduccion por zona rural / despoblacion",
      "Si eres afectado por DANA, busca las deducciones especificas en tu CCAA",
      "Revisa deducciones por gastos deportivos (Murcia, La Rioja, Andalucia)",
      "Revisa deducciones por gastos veterinarios (Andalucia, Murcia)",
    ],
    documents: [
      "Certificado de empadronamiento (para zona rural)",
      "Facturas de gastos deportivos / veterinarios",
      "Documentacion de DANA: fotos de danos, facturas de reparacion, resolucion del seguro",
    ],
    commonMistakes: [
      "No comprobar todas las deducciones disponibles en tu CCAA",
      "Asumir que las deducciones autonomicas aparecen automaticamente en el borrador",
      "No conservar justificantes durante 4 anos",
    ],
    tips: [
      "Cada CCAA tiene sus propias deducciones: revisa la lista completa de tu comunidad",
      "Las deducciones autonomicas NUNCA se aplican solas: siempre hay que marcarlas",
      "Consulta la guia de tu CCAA en la web de la AEAT",
    ],
  },
};

// =========================================================================
// GUIA ESPECIFICA POR ID DE DEDUCCION (PARA LAS MAS IMPORTANTES)
// =========================================================================

export const howToClaimById: Record<string, Partial<HowToClaim>> = {
  // --- Vivienda habitual (hipoteca pre-2013) ---
  est_vivienda_habitual: {
    isAutomatic: false,
    casillas: ["0547", "0548"],
    steps: [
      "Ve a 'Apartados declaracion' > 'Deducciones generales de la cuota'",
      "Busca 'Deduccion por inversion en vivienda habitual'",
      "Verifica que aparecen las cantidades pagadas por hipoteca (capital + intereses)",
      "Si faltan seguros vinculados (vida, hogar), anade manualmente en casillas 0547 y 0548",
      "Comprueba que la base no supera 9.040 EUR",
    ],
    documents: [
      "Certificado bancario: capital amortizado + intereses + gastos",
      "Facturas de seguros vinculados a la hipoteca",
      "Escritura de compraventa (fecha pre-2013)",
    ],
    commonMistakes: [
      "Olvidar incluir los seguros vinculados a la hipoteca",
      "No verificar que se aplico la deduccion antes de 2013",
    ],
    tips: [
      "15% de las cantidades pagadas (7,5% estatal + 7,5% autonomica)",
      "Base maxima: 9.040 EUR anuales. Deduccion maxima: 1.356 EUR",
    ],
  },

  // --- Maternidad ---
  est_maternidad: {
    isAutomatic: true,
    casillas: ["0611", "0613"],
    steps: [
      "Ve a 'Apartados declaracion' > 'Deducciones familiares'",
      "Busca 'Deduccion por maternidad'",
      "Verifica que aparecen tus hijos menores de 3 anos",
      "Si has tenido gastos de guarderia, comprueba el incremento (casilla 0613)",
      "Si cobras el pago anticipado (100 EUR/mes), verifica que no se duplique",
    ],
    documents: [
      "Libro de familia o certificado de nacimiento",
      "Vida laboral actualizada",
      "Facturas de guarderia (si aplica incremento)",
      "Modelo 233 de la guarderia",
    ],
    commonMistakes: [
      "Duplicar la deduccion con el pago anticipado",
      "Olvidar el incremento por guarderia (hasta 1.000 EUR extra)",
      "No verificar que el centro infantil esta autorizado",
    ],
    tips: [
      "1.200 EUR anuales por cada hijo menor de 3 anos",
      "Incremento guarderia: hasta 1.000 EUR adicionales",
      "Pago anticipado: 100 EUR/mes via Modelo 140",
    ],
  },

  // --- Familia numerosa ---
  est_familia_numerosa: {
    isAutomatic: false,
    casillas: ["0660+"],
    steps: [
      "Ve a 'Deducciones por familia numerosa o personas con discapacidad a cargo'",
      "Indica tipo: general (1.200 EUR) o especial (2.400 EUR)",
      "Si hay varios beneficiarios, indica si es individual o colectiva",
      "Verifica el pago anticipado (Modelo 143) si lo cobras",
    ],
    documents: [
      "Titulo de familia numerosa en vigor",
      "Vida laboral",
      "Libro de familia",
    ],
    commonMistakes: [
      "No renovar el titulo de familia numerosa",
      "No coordinar entre conyuges quien aplica la deduccion",
    ],
    tips: [
      "General: 1.200 EUR/ano. Especial: 2.400 EUR/ano",
      "Pago anticipado: 100 EUR/mes via Modelo 143",
    ],
  },

  // --- Donativos ---
  est_donativos: {
    isAutomatic: true,
    casillas: ["0723"],
    steps: [
      "Ve a 'Deducciones generales' > 'Donativos y otras aportaciones' > Anexo A.1",
      "Verifica que aparecen tus donaciones",
      "Si falta alguna, pulsa 'Anadir': NIF entidad, nombre, importe, recurrencia",
      "Marca si llevas 3+ anos donando a la misma entidad",
    ],
    documents: [
      "Certificado fiscal de cada ONG (emitido en enero-febrero)",
      "Justificante de transferencia bancaria",
    ],
    commonMistakes: [
      "No verificar si la donacion aparece en el borrador",
      "Olvidar marcar la recurrencia (3+ anos) para el 45%",
      "Donar a entidad no acogida a Ley 49/2002",
    ],
    tips: [
      "Primeros 250 EUR: 80% deduccion. Resto: 40% (45% si recurrente 3+ anos)",
      "Limite: 10% base liquidable",
    ],
  },

  // --- Startups ---
  est_startups: {
    isAutomatic: false,
    casillas: ["0711", "0712", "0713", "0714"],
    steps: [
      "Ve a 'Deducciones generales' > 'Inversion empresas nueva creacion'",
      "Casilla 0711: NIF de la empresa",
      "Casilla 0712: cantidad invertida",
      "Para segunda empresa: casillas 0713 y 0714",
    ],
    documents: [
      "Certificado de deduccion de la startup (OBLIGATORIO)",
      "Escritura de ampliacion de capital",
      "Justificante de pago",
    ],
    commonMistakes: [
      "No pedir el certificado a la empresa",
      "Invertir en empresa que no cumple requisitos",
      "Vender antes de 3 anos",
    ],
    tips: [
      "50% de deduccion, base maxima 100.000 EUR, deduccion maxima 50.000 EUR",
      "Empresa: SA/SL, no cotizada, < 5 anos antiguedad, < 400.000 EUR facturacion",
    ],
  },

  // --- Eficiencia energetica: reduccion demanda ---
  est_eficiencia_demanda: {
    isAutomatic: false,
    casillas: ["1655-1662", "0567"],
    steps: [
      "Ve a 'Deducciones generales' > 'Obras de mejora de la eficiencia energetica'",
      "Selecciona 'Reduccion de demanda de calefaccion y refrigeracion'",
      "Introduce referencia catastral, cantidades pagadas, y datos de ambos CEE",
      "El sistema verifica reduccion minima del 7%",
    ],
    documents: [
      "CEE anterior y posterior a las obras, registrados en la CCAA",
      "Facturas de las obras",
      "Justificantes de pago por transferencia",
    ],
    commonMistakes: [
      "No tener el CEE antes de empezar las obras",
      "No registrar los CEE en la CCAA",
      "Pagar en efectivo",
    ],
    tips: [
      "20% de deduccion, base maxima 5.000 EUR, deduccion maxima 1.000 EUR",
      "Requiere reducir al menos un 7% la demanda",
    ],
  },

  // --- Eficiencia energetica: consumo energia ---
  est_eficiencia_consumo: {
    isAutomatic: false,
    casillas: ["1663-1670", "0567"],
    steps: [
      "Ve a 'Deducciones generales' > 'Obras de mejora de la eficiencia energetica'",
      "Selecciona 'Mejora del consumo de energia primaria no renovable'",
      "Introduce referencia catastral, cantidades pagadas, y datos de ambos CEE",
      "El sistema verifica reduccion minima del 30% o mejora a calificacion A o B",
    ],
    documents: [
      "CEE anterior y posterior a las obras, registrados en la CCAA",
      "Facturas de las obras",
      "Justificantes de pago por transferencia",
    ],
    commonMistakes: [
      "No verificar que la reduccion alcanza el 30%",
      "Confundir esta deduccion con la de demanda (son diferentes)",
    ],
    tips: [
      "40% de deduccion, base maxima 7.500 EUR, deduccion maxima 3.000 EUR",
      "Requiere reducir 30% consumo O mejorar a calificacion A/B",
    ],
  },

  // --- Eficiencia energetica: rehabilitacion edificios ---
  est_eficiencia_edificio: {
    isAutomatic: false,
    casillas: ["1671-1679", "0567"],
    steps: [
      "Ve a 'Deducciones generales' > 'Obras de mejora de la eficiencia energetica'",
      "Selecciona 'Rehabilitacion energetica de edificios residenciales'",
      "Introduce referencia catastral, cantidades pagadas, y datos de ambos CEE",
      "Solo para obras en edificios de uso predominante residencial (comunidades de propietarios)",
    ],
    documents: [
      "CEE anterior y posterior a las obras, registrados en la CCAA",
      "Facturas de las obras",
      "Acuerdo de la comunidad de propietarios",
      "Justificantes de pago por transferencia",
    ],
    commonMistakes: [
      "Aplicar esta deduccion a obras en vivienda individual (es para edificios/comunidades)",
      "No registrar los CEE en la CCAA",
    ],
    tips: [
      "60% de deduccion, base maxima 5.000 EUR/ano (acumulado 15.000 EUR), deduccion maxima 3.000 EUR/ano",
      "Solo para edificios de uso predominante residencial",
    ],
  },

  // --- Vehiculo electrico ---
  est_vehiculo_electrico: {
    isAutomatic: false,
    casillas: ["0607", "1916-1927"],
    steps: [
      "Ve a 'Deducciones generales' > 'Vehiculos electricos enchufables'",
      "Introduce matricula, NIF del vendedor, precio de compra",
      "Resta la subvencion del Plan MOVES si la recibiste",
      "Resultado en casilla 0607",
    ],
    documents: [
      "Factura de compra del vehiculo",
      "Ficha tecnica (verificar que es electrico/enchufable)",
      "Matricula",
      "Resolucion Plan MOVES (si aplica)",
    ],
    commonMistakes: [
      "Incluir la subvencion MOVES en la base (hay que restarla)",
      "Deducir un hibrido no enchufable",
      "Precio del vehiculo superior a 45.000 EUR",
    ],
    tips: [
      "15% del valor, base maxima 20.000 EUR, deduccion maxima 3.000 EUR",
      "Compra entre 30 junio 2023 y 31 diciembre 2025",
    ],
  },

  // --- Punto de recarga ---
  est_punto_recarga: {
    isAutomatic: false,
    casillas: ["0607", "1929-1935"],
    steps: [
      "Ve a 'Deducciones generales' > 'Instalacion de infraestructuras de recarga'",
      "Introduce datos del inmueble donde se instalo",
      "Introduce el coste de instalacion",
      "La deduccion se practica en el periodo en que finalice la instalacion",
    ],
    documents: [
      "Factura de instalacion del punto de recarga",
      "Certificado del instalador autorizado",
      "Justificante de pago",
      "Nota simple del Registro de la Propiedad (titularidad del inmueble)",
    ],
    commonMistakes: [
      "Instalar en inmueble en alquiler (debe ser propiedad)",
      "No tener factura desglosada del instalador",
    ],
    tips: [
      "15% del coste, base maxima 4.000 EUR, deduccion maxima 600 EUR",
      "El inmueble debe ser de tu propiedad",
    ],
  },

  // --- Planes de pensiones ---
  est_planes_pensiones: {
    isAutomatic: true,
    casillas: ["0465", "462-476"],
    steps: [
      "Ve a 'Reducciones de la base imponible' > 'Sistemas de prevision social'",
      "Verifica que aparece tu aportacion en casilla 0465",
      "Si falta, modifica con el lapiz de edicion",
      "Introduce el importe aportado durante 2025",
    ],
    documents: [
      "Certificado de la gestora del plan de pensiones",
      "Extracto anual del plan",
    ],
    commonMistakes: [
      "Creer que puedes deducir cantidades ilimitadas (limite 1.500 EUR individual)",
      "No verificar que la gestora informo correctamente",
      "Olvidar que al rescatar tributaras como rendimiento del trabajo",
    ],
    tips: [
      "Limite individual: 1.500 EUR (o 30% rendimientos, el menor)",
      "Aportaciones empresariales: hasta 8.500 EUR adicionales",
      "Es una REDUCCION de base, no deduccion en cuota (mas ventajosa)",
    ],
  },

  // --- Alquiler vivienda habitual (transitoria) ---
  est_alquiler_vivienda: {
    isAutomatic: false,
    casillas: ["0562", "0563"],
    steps: [
      "Ve a 'Deducciones generales' > 'Alquiler de vivienda habitual'",
      "Introduce el NIF del arrendador",
      "Introduce las cantidades pagadas por alquiler durante 2025",
      "El sistema calcula el 10,05% y reparte 50/50 en casillas 0562 y 0563",
    ],
    documents: [
      "Contrato de alquiler (fecha anterior a 1 enero 2015)",
      "Recibos de pago del alquiler de 2025",
      "Declaracion de Renta anterior a 2015 donde se aplico",
      "NIF del arrendador",
    ],
    commonMistakes: [
      "Aplicar con contrato posterior a 2015",
      "No tener prueba de aplicacion previa a 2015",
      "Superar base imponible de 24.107,20 EUR",
    ],
    tips: [
      "Solo contrato ANTERIOR al 1 enero 2015 con deduccion aplicada previamente",
      "10,05% de las cantidades pagadas, limite base imponible 24.107,20 EUR",
    ],
  },

  // --- Deduccion 340 EUR baja renta ---
  est_deduccion_baja_renta: {
    isAutomatic: false,
    casillas: ["0414"],
    steps: [
      "IMPORTANTE: Esta deduccion NO aparece automaticamente en el borrador",
      "Ve a 'Deducciones generales' y busca la casilla 0414",
      "Usa el buscador de casillas (icono lupa) si no la encuentras",
      "La seccion se llama 'Deduccion por obtencion de rendimientos del trabajo'",
      "Pulsa el lapiz de edicion",
      "Comprueba que tus rendimientos estan entre 16.576 y 18.276 EUR",
      "Confirma la deduccion marcando la casilla",
    ],
    documents: [
      "Certificado de retenciones del trabajo",
      "Datos fiscales descargados (verificar que no superas 6.500 EUR en otras rentas)",
    ],
    commonMistakes: [
      "NO marcar la casilla 0414 (el error mas frecuente, Hacienda NO lo aplica)",
      "Asumir que Hacienda la aplica automaticamente (NO lo hace a pesar de tener los datos)",
      "No verificar el limite de 6.500 EUR en otras rentas",
      "Confundir rendimientos brutos con netos",
    ],
    tips: [
      "Cuantia maxima: 340 EUR",
      "Rendimientos del trabajo entre 16.576 y 18.276 EUR",
      "Otras rentas NO superiores a 6.500 EUR",
      "Si ya presentaste sin marcarla, haz una autoliquidacion rectificativa: Renta Web > 'Modificar declaracion presentada' > Marca casilla 0414 > Presenta rectificativa",
    ],
  },
};

// =========================================================================
// GUIA GENERAL DEL PROCESO
// =========================================================================

export const generalGuide: GeneralGuide[] = [
  {
    title: "Plazos de la Campana 2025",
    content:
      "8 abril 2026: Inicio campana (Internet, Renta Web, App). 29 abril: Apertura cita previa telefonica. 6 mayo: Inicio asistencia telefonica. 29 mayo: Apertura cita presencial. 1 junio: Inicio atencion presencial. 25 junio: Fin plazo declaraciones a ingresar con domiciliacion bancaria. 30 junio 2026: Fin campana (todas las declaraciones).",
  },
  {
    title: "Como acceder a Renta Web",
    content:
      "Accede a sede.agenciatributaria.gob.es > Servicio tramitacion borrador/declaracion. Puedes identificarte con: (A) Certificado digital o DNI electronico (el mas versatil), (B) Cl@ve Movil (codigo en el movil), o (C) Numero de referencia (necesitas casilla 505 de la declaracion anterior o IBAN). El certificado digital es el que menos problemas da.",
  },
  {
    title: "Como modificar el borrador",
    content:
      "NUNCA confirmes el borrador sin revisarlo. Muchas deducciones NO aparecen automaticamente. En Renta Web: 1) Abre 'Apartados declaracion' (barra superior). 2) Navega por secciones: Rendimientos, Reducciones, Deducciones generales, Deducciones autonomicas. 3) Usa el buscador de casillas (icono lupa) para ir directo a una casilla. 4) Pulsa el lapiz de edicion para modificar valores. 5) Guarda periodicamente. 6) Vuelve al Resumen para ver como cambia el resultado.",
  },
  {
    title: "Tributacion conjunta vs individual",
    content:
      "Regla rapida: Si ambos trabajan con salario medio-alto, INDIVIDUAL. Si un conyuge no tiene ingresos, CONJUNTA. Si uno gana mucho y otro poco (< 3.400 EUR), CONJUNTA. Familia monoparental: CONJUNTA (reduccion de 2.150 EUR). En Renta Web puedes simular ambas opciones desde 'Datos identificativos' y comparar el resultado.",
  },
  {
    title: "Fraccionamiento del pago",
    content:
      "Si tu declaracion sale a pagar, puedes fraccionar en dos plazos SIN intereses: 60% al presentar + 40% hasta el 5 noviembre 2026. En Renta Web, al llegar al resultado, marca 'Fraccionar el pago' e introduce el IBAN. No necesitas aportar garantia.",
  },
  {
    title: "Que hacer si te equivocas",
    content:
      "Si el error te perjudico (pagaste de mas o te devolvieron de menos): Autoliquidacion rectificativa. En Renta Web > 'Modificar declaracion presentada' > Marca 'Autoliquidacion rectificativa' > Corrige > Presenta. Hacienda devolvera la diferencia. Plazo: 4 anos. Sin recargo si presentas durante la campana. Si el error perjudico a Hacienda (pagaste de menos): Declaracion complementaria con el mismo proceso pero marcando 'Complementaria'.",
  },
  {
    title: "Documentacion general necesaria",
    content:
      "Datos fiscales descargados de la AEAT. DNI/NIE en vigor. Certificado de retenciones del trabajo. Referencia catastral de inmuebles (IBI). IBAN de cuenta bancaria. Declaracion del ano anterior (para casilla 505 y verificar deducciones transitivas).",
  },
  {
    title: "Plazos de devolucion",
    content:
      "Plazo legal maximo: 6 meses (hasta 31 diciembre 2026). Tiempo real habitual: 1-4 semanas. Renta Directa: desde 48 horas. Consulta el estado en la Sede Electronica > 'Consultar devolucion'. Si tarda mas de 6 meses, Hacienda debe pagarte intereses de demora. Consejo: cuanto antes presentes, antes cobras.",
  },
  {
    title: "Atencion presencial y telefonica",
    content:
      "Plan 'Le Llamamos': 6 mayo - 30 junio 2026 (cita desde 29 abril). Un funcionario te llama y hace la declaracion por telefono. Atencion presencial: 1-30 junio 2026 (cita desde 29 mayo). Pedir cita: web AEAT, app, o telefonos 91 553 00 71 / 901 22 33 44. Consejo: las citas se agotan rapido en junio, pide cita en mayo.",
  },
];

// =========================================================================
// GUIA AUTONOMICA POR CCAA
// =========================================================================

export const autonomicaGuide: Record<
  string,
  {
    process: string;
    importantNotes: string[];
    keyDocuments: string[];
  }
> = {
  comunidad_valenciana: {
    process:
      "La Comunitat Valenciana tiene unas 40 deducciones autonomicas, la CCAA con mas deducciones de Espana. En Renta Web: Apartados > Deducciones autonomicas > C. Valenciana. Incluye deducciones por nacimiento (300 EUR/hijo), alquiler (20-30%), guarderia (15%, max 297 EUR), zona despoblacion (hasta 1.550 EUR), DANA, donaciones medioambientales y discapacidad.",
    importantNotes: [
      "Las deducciones autonomicas NO aparecen automaticamente en el borrador",
      "Para alquiler: la fianza DEBE estar depositada en la GVA",
      "Deducciones DANA: hasta 2.000 EUR por danos en vivienda, restar importe de seguro y ayudas publicas",
      "Requisito renta alquiler: base liquidable < 30.000 EUR individual / < 47.000 EUR conjunta",
      "Residencia zona despoblacion: consulta lista en presidencia.gva.es",
    ],
    keyDocuments: [
      "Justificante deposito fianza GVA (alquiler)",
      "Facturas reparacion DANA con pago bancario",
      "Certificado NIF arrendador",
      "Fotos y documentacion danos DANA",
    ],
  },

  murcia: {
    process:
      "La Region de Murcia tiene 20 deducciones autonomicas (3 nuevas en 2024). En Renta Web: Apartados > Deducciones autonomicas > Region de Murcia. Incluye guarderia (20%, max 1.000 EUR), nacimiento (100 EUR/hijo), gastos deportivos (30%, max 150 EUR), gastos veterinarios (30%, max 100 EUR), inversion vivienda jovenes, familia monoparental y brecha digital.",
    importantNotes: [
      "Gastos deportivos: nueva deduccion, conservar facturas del gimnasio con NIF",
      "Gastos veterinarios: animal con microchip e inscrito en registro autonomico",
      "Brecha digital: nueva 2024, para municipios < 5.000 hab. (internet y equipos)",
      "Inversion vivienda jovenes: edad <= 40 anos, base imponible < 24.107,20 EUR",
    ],
    keyDocuments: [
      "Facturas gimnasio/centro deportivo con NIF",
      "Facturas veterinario con NIF del centro",
      "Justificante registro animal (microchip)",
      "Facturas guarderia",
    ],
  },

  castilla_la_mancha: {
    process:
      "Castilla-La Mancha tiene 25 deducciones autonomicas. Mas de 200.000 contribuyentes pueden beneficiarse. En Renta Web: Apartados > Deducciones autonomicas > Castilla-La Mancha. Incluye nacimiento (100-900 EUR), guarderia (30%, max 500 EUR), familia numerosa/monoparental, mayores 65 o discapacidad (600 EUR), alquiler jovenes (15-20%), zona rural, gastos educativos y vivienda zona rural.",
    importantNotes: [
      "Nacimiento: 100 EUR (1 hijo), 500 EUR (2 hijos), 900 EUR (3+). Limite renta: 27.000/36.000 EUR",
      "Alquiler: fianza depositada en el organismo de CLM obligatoria",
      "Zona rural: consultar listado en portaltributario.jccm.es",
      "Mayores/discapacidad: 600 EUR por cada persona > 65 o discapacidad >= 33%",
      "Vivienda zona rural: 15% de adquisicion/rehabilitacion, base max 12.000 EUR/ano",
    ],
    keyDocuments: [
      "Certificado empadronamiento (zona rural)",
      "Tarjeta sanitaria (zona rural)",
      "Titulo familia numerosa",
      "Facturas libros de texto",
      "Justificante deposito fianza CLM (alquiler)",
    ],
  },

  canarias: {
    process:
      "Canarias tiene mas de 25 deducciones autonomicas con cambios significativos en 2024. En Renta Web: Apartados > Deducciones autonomicas > Canarias. Destaca por tener la deduccion de salud mas amplia (gastos enfermedad 12%, dental, optica), ademas de nacimiento, alquiler (24%, max 740 EUR), guarderia (max 530 EUR), discapacidad (400 EUR), mayores 65 (160 EUR) y nueva deduccion por empleados del hogar.",
    importantNotes: [
      "Gastos enfermedad: incluye consultas, dental, optica, embarazo/parto. NO farmacia",
      "Desde 2024: OBLIGATORIO introducir NIF del profesional sanitario",
      "Limite salud: 500 EUR individual / 700 EUR conjunta (+100 si > 65 o discapacidad >= 65%)",
      "Alquiler: porcentaje y limite subidos este ano (24%, max 740 EUR)",
      "Empleados del hogar: NUEVA 2024, 20% cuotas SS, max 500 EUR",
    ],
    keyDocuments: [
      "Facturas medicas/dentales/optica con NIF profesional",
      "Recibos de optica (gafas, lentillas)",
      "Recibos Seguridad Social empleados hogar",
      "Contrato alquiler con fianza depositada",
    ],
  },

  baleares: {
    process:
      "Islas Baleares tiene unas 20 deducciones autonomicas con novedades en sostenibilidad. En Renta Web: Apartados > Deducciones autonomicas > Illes Balears. Incluye alquiler (15-20%, max 530-650 EUR), inversiones sostenibilidad vivienda (50%, max 10.000 EUR base), nacimiento, discapacidad, donaciones, plazas dificil cobertura, alta autonomo y compensacion hipoteca variable.",
    importantNotes: [
      "Sostenibilidad vivienda: 50% inversiones mejora calidad/sostenibilidad, tanto propia como alquilada",
      "Alquiler: requisito base imponible < 33.000 EUR individual / < 52.800 EUR conjunta",
      "Alta autonomo: 1.000 EUR si te diste de alta en 2024, mantener censo 1 ano",
      "Plazas dificil cobertura: 40% gastos vivienda y transporte para trabajadores trasladados",
      "Discapacidad: 88-165 EUR segun tipo y grado",
    ],
    keyDocuments: [
      "Facturas obras sostenibilidad vivienda",
      "Certificado energetico (si aplica sostenibilidad)",
      "Alta censal IAE (si aplica deduccion autonomo)",
      "Certificado discapacidad",
    ],
  },

  andalucia: {
    process:
      "Andalucia ofrece deducciones autonomicas por vivienda, familia, educacion, discapacidad, donaciones, gastos deportivos (nueva 2025) y gastos veterinarios. En Renta Web: Apartados > Deducciones autonomicas > Andalucia.",
    importantNotes: [
      "Gastos deportivos: NUEVA 2025, 15%, max 100 EUR",
      "Gastos veterinarios: 30%, max 100 EUR",
      "Nacimiento: 200 EUR (400 en zona despoblacion)",
      "Discapacidad: 150 EUR para >= 33%",
    ],
    keyDocuments: [
      "Facturas gimnasio/deporte con NIF",
      "Facturas veterinario con NIF y registro animal",
      "Certificado discapacidad",
    ],
  },

  madrid: {
    process:
      "La Comunidad de Madrid ofrece deducciones autonomicas por nacimiento/adopcion, gastos educativos, alquiler vivienda, cuidado hijos menores, y familia numerosa. En Renta Web: Apartados > Deducciones autonomicas > Comunidad de Madrid.",
    importantNotes: [
      "Nacimiento/adopcion: 721,70 EUR, tambien los 2 anos siguientes",
      "Gastos educativos: incluye ensenanza, uniformes, idiomas (una de las mas completas)",
      "Alquiler: verificar deposito fianza en IVIMA/Agencia Vivienda Social",
      "Pago en efectivo NO da derecho a deduccion educativa",
    ],
    keyDocuments: [
      "Facturas centro educativo con NIF",
      "Facturas uniformes, idiomas",
      "Justificante deposito fianza (alquiler)",
    ],
  },

  cataluna: {
    process:
      "Cataluna ofrece deducciones autonomicas por nacimiento/adopcion, alquiler vivienda habitual, rehabilitacion vivienda, donaciones, y situaciones especificas. En Renta Web: Apartados > Deducciones autonomicas > Cataluna. Consulta detalles en atc.gencat.cat.",
    importantNotes: [
      "Consultar deducciones actualizadas en el portal de la ATC (Agencia Tributaria de Cataluna)",
      "Deposito fianza alquiler en INCASOL",
      "Deducciones por donaciones a entidades catalanas",
    ],
    keyDocuments: [
      "Justificante deposito fianza INCASOL (alquiler)",
      "Certificados de donaciones a entidades catalanas",
    ],
  },

  aragon: {
    process:
      "Aragon ofrece deducciones autonomicas por nacimiento, gastos de guarderia, alquiler de vivienda, zona despoblacion, y gastos educativos. En Renta Web: Apartados > Deducciones autonomicas > Aragon.",
    importantNotes: [
      "Zona despoblacion: deduccion incrementada para municipios rurales",
      "Gastos educativos: incluye libros de texto y material escolar",
    ],
    keyDocuments: [
      "Certificado empadronamiento (zona rural)",
      "Facturas gastos educativos",
    ],
  },

  asturias: {
    process:
      "El Principado de Asturias ofrece deducciones autonomicas por gastos educativos, alquiler vivienda, nacimiento, y situaciones familiares especificas. En Renta Web: Apartados > Deducciones autonomicas > Asturias.",
    importantNotes: [
      "Gastos educativos disponibles",
      "Alquiler de vivienda habitual para jovenes",
    ],
    keyDocuments: [
      "Facturas centro educativo",
      "Contrato y recibos de alquiler",
    ],
  },

  cantabria: {
    process:
      "Cantabria destaca por una de las deducciones por nacimiento mas generosas (1.400 EUR, mas 2 anos siguientes). En Renta Web: Apartados > Deducciones autonomicas > Cantabria.",
    importantNotes: [
      "Nacimiento/adopcion: 1.400 EUR, tambien los 2 anos siguientes",
      "Deducciones por cuidado de familiares",
    ],
    keyDocuments: [
      "Libro de familia / certificado nacimiento",
    ],
  },

  castilla_y_leon: {
    process:
      "Castilla y Leon ofrece deducciones por nacimiento, familia numerosa, cuidado hijos, gastos educativos y zona despoblacion. En Renta Web: Apartados > Deducciones autonomicas > Castilla y Leon.",
    importantNotes: [
      "Amplia cobertura de gastos educativos",
      "Deducciones por residencia en zona rural / despoblacion",
    ],
    keyDocuments: [
      "Certificado empadronamiento",
      "Facturas gastos educativos",
    ],
  },

  extremadura: {
    process:
      "Extremadura ofrece deducciones por nacimiento, gastos educativos, zona despoblacion y trabajo por cuenta ajena. En Renta Web: Apartados > Deducciones autonomicas > Extremadura.",
    importantNotes: [
      "Gastos educativos incluidos en las deducciones",
      "Deducciones para zona rural / despoblacion",
    ],
    keyDocuments: [
      "Facturas gastos educativos",
      "Certificado empadronamiento (zona rural)",
    ],
  },

  galicia: {
    process:
      "Galicia ofrece deducciones por nacimiento (300 EUR si base > 22.000 EUR), alquiler vivienda, eficiencia energetica autonomica (15%), y zona despoblacion. En Renta Web: Apartados > Deducciones autonomicas > Galicia.",
    importantNotes: [
      "Eficiencia energetica autonomica adicional: 15% inversiones, base max 9.000 EUR",
      "Nacimiento: 300 EUR, condicion base imponible > 22.000 EUR",
      "Zona despoblacion con incrementos especificos",
    ],
    keyDocuments: [
      "CEE antes y despues de obras (eficiencia energetica)",
      "Certificado empadronamiento (zona rural)",
    ],
  },

  la_rioja: {
    process:
      "La Rioja ofrece deducciones por nacimiento, gastos educativos, gastos deportivos (30%, max 300 EUR) y situaciones familiares. En Renta Web: Apartados > Deducciones autonomicas > La Rioja.",
    importantNotes: [
      "Gastos deportivos: 30% general, 100% si > 65 anos o discapacidad, max 300 EUR",
      "Deducciones educativas disponibles",
    ],
    keyDocuments: [
      "Facturas gimnasio/deporte con NIF",
      "Facturas gastos educativos",
    ],
  },

  pais_vasco: {
    process:
      "El Pais Vasco tiene regimen foral propio con normativa fiscal completa diferente al regimen comun. La declaracion se presenta en las Haciendas Forales de cada territorio historico (Alava, Bizkaia, Gipuzkoa), NO en la AEAT. Plazos diferentes: 31 marzo - 30 junio 2025.",
    importantNotes: [
      "Regimen foral: normativa fiscal propia, no solo deducciones sino todo el IRPF",
      "Se presenta en las Haciendas Forales, NO en la AEAT",
      "Plazos diferentes al resto de Espana",
      "Consultar la web de la Hacienda Foral de tu territorio",
    ],
    keyDocuments: [
      "Documentacion segun normativa foral de cada territorio",
    ],
  },

  navarra: {
    process:
      "Navarra tiene regimen foral propio con normativa fiscal completa diferente al regimen comun. La declaracion se presenta en la Hacienda Foral de Navarra. Plazos: 7 abril - 26 junio 2025.",
    importantNotes: [
      "Regimen foral: normativa fiscal propia completa",
      "Se presenta en Hacienda Foral de Navarra, NO en la AEAT",
      "Plazos diferentes al regimen comun",
    ],
    keyDocuments: [
      "Documentacion segun normativa foral navarra",
    ],
  },

  ceuta: {
    process:
      "Ceuta cuenta con deducciones especificas por residencia en territorio con bonificacion del 60% en cuota. En Renta Web: Apartados > Deducciones autonomicas > Ceuta.",
    importantNotes: [
      "Bonificacion del 60% en la cuota para residentes",
      "Consultar deducciones especificas actualizadas",
    ],
    keyDocuments: [
      "Certificado de empadronamiento en Ceuta",
    ],
  },

  melilla: {
    process:
      "Melilla cuenta con deducciones especificas por residencia en territorio con bonificacion del 60% en cuota. En Renta Web: Apartados > Deducciones autonomicas > Melilla.",
    importantNotes: [
      "Bonificacion del 60% en la cuota para residentes",
      "Consultar deducciones especificas actualizadas",
    ],
    keyDocuments: [
      "Certificado de empadronamiento en Melilla",
    ],
  },
};
