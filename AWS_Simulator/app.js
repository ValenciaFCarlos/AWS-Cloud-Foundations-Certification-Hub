/* =============================================================
   CARLOS LEARNING FRAMEWORK — AWS CLF-C02 SIMULATOR
   Motor completo v11.0 — MVP Cierre (Timer + Modales + Insights)
   ============================================================= */

const STORAGE_KEY = 'clf_c02_simulator_state_v6';
const THEME_KEY   = 'clf_c02_theme';
const LANG_KEY    = 'clf_c02_lang';

const Q_STATE = {
  UNSEEN: 'UNSEEN',
  ANSWERED_CORRECT: 'ANSWERED_CORRECT',
  REVIEW: 'REVIEW',
  RECOVERED_WITH_HINT: 'RECOVERED_WITH_HINT',
  UNRESOLVED: 'UNRESOLVED'
};

const DOMAIN_DEFS = {
  'Cloud Concepts':              { color: 'blue',   icon: 'cloud',  weight: 24 },
  'Security & Compliance':       { color: 'green',  icon: 'shield', weight: 30 },
  'Technology & Services':       { color: 'orange', icon: 'cube',   weight: 34 },
  'Billing, Pricing & Support':  { color: 'purple', icon: 'doc',    weight: 12 }
};

const EXAM_WEIGHTS = {
  'Cloud Concepts':              0.24,
  'Security & Compliance':       0.30,
  'Technology & Services':       0.34,
  'Billing, Pricing & Support':  0.12
};

// =============================================================
// DISTRIBUCIÓN MIXED EXAM — Tabla oficial (máximo 100 preguntas)
// =============================================================
const MIXED_DISTRIBUTIONS = {
  10:  { 'Cloud Concepts': 2, 'Security & Compliance': 3, 'Technology & Services': 4, 'Billing, Pricing & Support': 1 },
  25:  { 'Cloud Concepts': 6, 'Security & Compliance': 7, 'Technology & Services': 9, 'Billing, Pricing & Support': 3 },
  50:  { 'Cloud Concepts': 12, 'Security & Compliance': 15, 'Technology & Services': 17, 'Billing, Pricing & Support': 6 },
  100: { 'Cloud Concepts': 24, 'Security & Compliance': 30, 'Technology & Services': 34, 'Billing, Pricing & Support': 12 }
};

// =============================================================
// EXAM TIMER — Duración por cantidad de preguntas
// =============================================================
const EXAM_TIME_MINUTES = {
  10: 15,
  25: 30,
  50: 60,
  100: 120
};

// =============================================================
// EXAM TIPS — 50 tips rotativos (no relacionados con la pregunta actual)
// =============================================================
const EXAM_TIPS = [
  { es: 'Lee primero la última línea de la pregunta antes de revisar las opciones.', en: 'Read the last line of the question first before reviewing the options.' },
  { es: 'Identifica palabras clave como BEST, MOST COST-EFFECTIVE o MOST SECURE.', en: 'Identify keywords like BEST, MOST COST-EFFECTIVE or MOST SECURE.' },
  { es: 'El examen evalúa conceptos más que configuración técnica profunda.', en: 'The exam tests concepts more than deep technical configuration.' },
  { es: 'Aprende muy bien el Shared Responsibility Model.', en: 'Learn the Shared Responsibility Model very well.' },
  { es: 'Diferencia siempre qué protege AWS y qué protege el cliente.', en: 'Always differentiate what AWS protects and what the customer protects.' },
  { es: 'Cuando veas "global service", piensa en IAM o CloudFront.', en: 'When you see "global service", think IAM or CloudFront.' },
  { es: 'S3 es almacenamiento de objetos.', en: 'S3 is object storage.' },
  { es: 'EBS es almacenamiento de bloques.', en: 'EBS is block storage.' },
  { es: 'EFS es almacenamiento compartido.', en: 'EFS is shared storage.' },
  { es: 'DynamoDB es una base de datos NoSQL administrada.', en: 'DynamoDB is a managed NoSQL database.' },
  { es: 'RDS es una base de datos relacional administrada.', en: 'RDS is a managed relational database.' },
  { es: 'Lambda ejecuta código sin administrar servidores.', en: 'Lambda runs code without managing servers.' },
  { es: 'CloudFront es una CDN global.', en: 'CloudFront is a global CDN.' },
  { es: 'Route 53 es DNS administrado.', en: 'Route 53 is managed DNS.' },
  { es: 'IAM controla acceso y permisos.', en: 'IAM controls access and permissions.' },
  { es: 'AWS Organizations administra múltiples cuentas.', en: 'AWS Organizations manages multiple accounts.' },
  { es: 'Multi-AZ mejora disponibilidad.', en: 'Multi-AZ improves availability.' },
  { es: 'Auto Scaling mejora elasticidad.', en: 'Auto Scaling improves elasticity.' },
  { es: 'ELB distribuye tráfico entre recursos.', en: 'ELB distributes traffic between resources.' },
  { es: 'S3 Glacier está diseñado para archivado.', en: 'S3 Glacier is designed for archiving.' },
  { es: 'AWS Budgets ayuda a controlar costos.', en: 'AWS Budgets helps control costs.' },
  { es: 'Cost Explorer ayuda a analizar gastos.', en: 'Cost Explorer helps analyze spending.' },
  { es: 'Trusted Advisor ofrece recomendaciones.', en: 'Trusted Advisor provides recommendations.' },
  { es: 'AWS Artifact contiene documentación de compliance.', en: 'AWS Artifact contains compliance documentation.' },
  { es: 'AWS Shield protege contra DDoS.', en: 'AWS Shield protects against DDoS.' },
  { es: 'AWS WAF protege aplicaciones web.', en: 'AWS WAF protects web applications.' },
  { es: 'GuardDuty detecta amenazas.', en: 'GuardDuty detects threats.' },
  { es: 'CloudTrail registra llamadas API.', en: 'CloudTrail logs API calls.' },
  { es: 'CloudWatch monitorea recursos.', en: 'CloudWatch monitors resources.' },
  { es: 'El modelo Pay-As-You-Go es fundamental.', en: 'The Pay-As-You-Go model is fundamental.' },
  { es: 'Menos administración suele ser la mejor respuesta.', en: 'Less administration is usually the best answer.' },
  { es: 'Busca siempre la opción administrada.', en: 'Always look for the managed option.' },
  { es: 'No todas las preguntas requieren EC2.', en: 'Not all questions require EC2.' },
  { es: 'Muchas respuestas incorrectas incluyen complejidad innecesaria.', en: 'Many incorrect answers include unnecessary complexity.' },
  { es: 'Piensa siempre en escalabilidad.', en: 'Always think about scalability.' },
  { es: 'Piensa siempre en disponibilidad.', en: 'Always think about availability.' },
  { es: 'Piensa siempre en optimización de costos.', en: 'Always think about cost optimization.' },
  { es: 'Well-Architected Framework aparece frecuentemente de forma indirecta.', en: 'Well-Architected Framework appears frequently in an indirect way.' },
  { es: 'Security es un pilar Well-Architected.', en: 'Security is a Well-Architected pillar.' },
  { es: 'Reliability es un pilar Well-Architected.', en: 'Reliability is a Well-Architected pillar.' },
  { es: 'Cost Optimization es un pilar Well-Architected.', en: 'Cost Optimization is a Well-Architected pillar.' },
  { es: 'Operational Excellence es un pilar Well-Architected.', en: 'Operational Excellence is a Well-Architected pillar.' },
  { es: 'Performance Efficiency es un pilar Well-Architected.', en: 'Performance Efficiency is a Well-Architected pillar.' },
  { es: 'Sustainability es un pilar Well-Architected.', en: 'Sustainability is a Well-Architected pillar.' },
  { es: 'Aprende los casos de uso típicos de cada servicio.', en: 'Learn the typical use cases of each service.' },
  { es: 'Los servicios serverless suelen reducir carga operativa.', en: 'Serverless services usually reduce operational overhead.' },
  { es: 'Identifica el problema antes de pensar en el servicio.', en: 'Identify the problem before thinking about the service.' },
  { es: 'Entiende por qué existe cada servicio.', en: 'Understand why each service exists.' },
  { es: 'Descarta primero las opciones obviamente incorrectas.', en: 'Rule out obviously incorrect options first.' },
  { es: 'No memorices servicios; comprende qué problema resuelven.', en: 'Do not memorize services; understand what problem they solve.' }
];

// =============================================================
// CONCEPT DETAILS — Diccionario de conceptos para Concept Insight
// =============================================================
const CONCEPT_DETAILS = {
  'default': {
    name: '¿Qué es AWS?',
    text: 'AWS (Amazon Web Services) es la plataforma de computación en la nube de Amazon. Permite consumir infraestructura, almacenamiento, redes, bases de datos y servicios administrados bajo demanda.',
    tip: 'AWS utiliza un modelo Pay-As-You-Go donde solo pagas por los recursos que utilizas.'
  },
  'IAM': {
    name: 'IAM',
    text: 'Identity and Access Management. Permite controlar quién puede acceder a recursos AWS y qué acciones puede realizar.',
    tip: 'Usuarios = personas · Roles = servicios o aplicaciones.'
  },
  'Amazon S3': {
    name: 'Amazon S3',
    text: 'Simple Storage Service. Almacenamiento de objetos altamente duradero y escalable, organizado en buckets.',
    tip: 'S3 = objetos · EBS = bloques · EFS = archivos compartidos.'
  },
  'Amazon CloudFront': {
    name: 'Amazon CloudFront',
    text: 'CloudFront es la CDN global de AWS. Distribuye contenido desde ubicaciones cercanas al usuario para reducir latencia.',
    tip: 'Contenido global + baja latencia = CloudFront.'
  },
  'Amazon EC2': {
    name: 'Amazon EC2',
    text: 'Elastic Compute Cloud. Servidores virtuales configurables con control total del sistema operativo.',
    tip: 'On-Demand = flexibilidad · Reserved = ahorro · Spot = máximo descuento.'
  },
  'AWS Lambda': {
    name: 'AWS Lambda',
    text: 'Servicio serverless que ejecuta código en respuesta a eventos sin administrar servidores.',
    tip: 'Pagas solo por el tiempo de ejecución en milisegundos.'
  },
  'Amazon RDS': {
    name: 'Amazon RDS',
    text: 'Relational Database Service. Bases de datos relacionales administradas (MySQL, PostgreSQL, Oracle, etc.).',
    tip: 'RDS = SQL · DynamoDB = NoSQL.'
  },
  'Amazon DynamoDB': {
    name: 'Amazon DynamoDB',
    text: 'Base de datos NoSQL serverless con latencia de milisegundos de un solo dígito a cualquier escala.',
    tip: 'Ideal para apps móviles, juegos y cargas de alta concurrencia.'
  },
  'AWS KMS': {
    name: 'AWS KMS',
    text: 'Key Management Service. Servicio administrado para crear y controlar claves criptográficas utilizadas para cifrar datos.',
    tip: 'Cifrado en reposo = KMS · Cifrado en tránsito = ACM.'
  },
  'Amazon VPC': {
    name: 'Amazon VPC',
    text: 'Virtual Private Cloud. Red virtual aislada donde defines subredes, tablas de ruteo e internet gateways.',
    tip: 'Pública = con acceso a internet · Privada = sin acceso directo.'
  },
  'Amazon Route 53': {
    name: 'Amazon Route 53',
    text: 'Servicio DNS altamente disponible para traducir nombres de dominio a direcciones IP.',
    tip: 'El 53 hace referencia al puerto estándar de DNS.'
  },
  'AWS Organizations': {
    name: 'AWS Organizations',
    text: 'Servicio para administrar centralmente múltiples cuentas de AWS con facturación consolidada.',
    tip: 'SCPs definen límites máximos de permisos entre cuentas.'
  },
  'Amazon GuardDuty': {
    name: 'Amazon GuardDuty',
    text: 'Detección inteligente de amenazas usando Machine Learning sobre CloudTrail, VPC Flow Logs y DNS Logs.',
    tip: 'Se activa con un clic y no requiere agentes.'
  },
  'AWS CloudTrail': {
    name: 'AWS CloudTrail',
    text: 'Registra todas las llamadas a la API y actividad de la cuenta para auditoría.',
    tip: 'Responde a: ¿quién hizo qué, cuándo y desde dónde?'
  },
  'Amazon CloudWatch': {
    name: 'Amazon CloudWatch',
    text: 'Servicio de monitoreo que recopila métricas, logs y permite configurar alarmas.',
    tip: 'CloudWatch = métricas · CloudTrail = auditoría.'
  },
  'AWS Config': {
    name: 'AWS Config',
    text: 'Evalúa y rastrea las configuraciones de recursos contra reglas de cumplimiento.',
    tip: 'Responde a: ¿el recurso cumple con las reglas definidas?'
  },
  'AWS Shield': {
    name: 'AWS Shield',
    text: 'Protección administrada contra ataques DDoS. Standard es gratuito; Advanced añade soporte 24/7.',
    tip: 'Shield = capas 3/4 · WAF = capa 7.'
  },
  'AWS WAF': {
    name: 'AWS WAF',
    text: 'Web Application Firewall que filtra tráfico HTTP/HTTPS en la capa 7.',
    tip: 'Bloquea SQL Injection, XSS y patrones maliciosos.'
  },
  'Amazon ElastiCache': {
    name: 'Amazon ElastiCache',
    text: 'Caché en memoria compatible con Redis o Memcached para acelerar lecturas.',
    tip: 'Reduce la carga de la base de datos principal.'
  },
  'AWS Snowball': {
    name: 'AWS Snowball',
    text: 'Dispositivo físico para migrar petabytes de datos hacia AWS fuera de línea.',
    tip: 'Úsalo cuando la red sea un cuello de botella.'
  },
  'Amazon Redshift': {
    name: 'Amazon Redshift',
    text: 'Data Warehouse columnar a escala de petabytes para análisis OLAP.',
    tip: 'Redshift = OLAP · RDS = OLTP.'
  },
  'AWS CloudFormation': {
    name: 'AWS CloudFormation',
    text: 'Infraestructura como Código (IaC) con plantillas declarativas en JSON o YAML.',
    tip: 'Aprovisiona recursos en grupos llamados stacks.'
  },
  'AWS Trusted Advisor': {
    name: 'AWS Trusted Advisor',
    text: 'Recomendaciones automáticas en 5 categorías: costo, seguridad, rendimiento, tolerancia a fallos y cuotas.',
    tip: 'Business y Enterprise desbloquean las comprobaciones completas.'
  },
  'AWS Secrets Manager': {
    name: 'AWS Secrets Manager',
    text: 'Gestiona y rota automáticamente credenciales, claves API y secretos.',
    tip: 'Rotación automática integrada con RDS.'
  },
  'AWS Certificate Manager': {
    name: 'AWS Certificate Manager',
    text: 'ACM aprovisiona y renueva certificados SSL/TLS gratuitos para servicios de AWS.',
    tip: 'Se integra con CloudFront y Load Balancers.'
  },
  'AWS Step Functions': {
    name: 'AWS Step Functions',
    text: 'Orquesta múltiples servicios de AWS en flujos de trabajo visuales con máquinas de estado.',
    tip: 'Coordina Lambda, SQS, Glue y más.'
  },
  'Amazon SQS': {
    name: 'Amazon SQS',
    text: 'Colas de mensajes administradas para desacoplar componentes (modelo pull).',
    tip: 'SQS = punto a punto · SNS = pub/sub.'
  },
  'Amazon SNS': {
    name: 'Amazon SNS',
    text: 'Notificaciones pub/sub (push) a múltiples suscriptores: email, SMS, Lambda, SQS.',
    tip: 'SNS = fan-out de uno a muchos.'
  },
  'AWS Direct Connect': {
    name: 'AWS Direct Connect',
    text: 'Conexión física privada y dedicada entre las instalaciones del cliente y AWS.',
    tip: 'Evita el internet público para mayor estabilidad.'
  },
  'Amazon Elastic Load Balancing': {
    name: 'Elastic Load Balancing',
    text: 'Distribuye automáticamente el tráfico entrante entre múltiples destinos.',
    tip: 'ALB = capa 7 · NLB = capa 4.'
  },
  'AWS Auto Scaling': {
    name: 'AWS Auto Scaling',
    text: 'Ajusta automáticamente el número de instancias EC2 según la demanda.',
    tip: 'Escala horizontal = más instancias.'
  },
  'Reserved Instances': {
    name: 'Reserved Instances',
    text: 'Compromiso de 1 o 3 años a cambio de descuentos de hasta 72% en EC2.',
    tip: 'Ideal para cargas de trabajo estables.'
  },
  'AWS Support Plans': {
    name: 'AWS Support Plans',
    text: 'Niveles: Basic (gratis), Developer, Business, Enterprise. Cada uno con diferentes SLAs.',
    tip: 'Enterprise incluye un TAM dedicado.'
  }
};

const DOMAIN_ICONS = {
  cloud:  '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 18h10a4 4 0 0 0 .4-7.98A5.5 5.5 0 0 0 7.1 9.5 4 4 0 0 0 7 18Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3.5 5 6v5.2c0 4.2 2.9 7.4 7 8.3 4.1-.9 7-4.1 7-8.3V6l-7-2.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  cube:   '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m12 3 7.5 4.3v9.4L12 21l-7.5-4.3V7.3L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M4.5 7.3 12 11.6l7.5-4.3M12 11.6V21" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  doc:    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3.5h7l3.5 3.5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15.5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3.5V7h3.5M9 12h6M9 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
};

// =============================================================
// DOMAIN META
// =============================================================
const DOMAIN_META = {
  'all': {
    name: 'Mixed Exam',
    desc: 'Todos los dominios · Distribución oficial CLF-C02',
    icon: 'target',
    color: 'all',
    isRecommended: true,
    weight: null
  },
  'Cloud Concepts': {
    name: 'Cloud Concepts',
    desc: 'Enfócate en conceptos fundamentales de la nube',
    icon: 'cloud',
    color: 'blue',
    isRecommended: false,
    weight: 24
  },
  'Security & Compliance': {
    name: 'Security & Compliance',
    desc: 'Enfócate en seguridad, IAM y cumplimiento',
    icon: 'shield',
    color: 'green',
    isRecommended: false,
    weight: 30
  },
  'Technology & Services': {
    name: 'Technology & Services',
    desc: 'Enfócate en servicios core de AWS',
    icon: 'cube',
    color: 'amber',
    isRecommended: false,
    weight: 34
  },
  'Billing, Pricing & Support': {
    name: 'Billing, Pricing & Support',
    desc: 'Enfócate en costos, facturación y soporte',
    icon: 'doc',
    color: 'purple',
    isRecommended: false,
    weight: 12
  }
};

const DOMAIN_SVG_ICONS = {
  target: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
  cloud:  '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M7 18h10a4 4 0 0 0 .4-7.98A5.5 5.5 0 0 0 7.1 9.5 4 4 0 0 0 7 18Z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3.5 5 6v5.2c0 4.2 2.9 7.4 7 8.3 4.1-.9 7-4.1 7-8.3V6l-7-2.5Z"/></svg>',
  cube:   '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 7.5 4.3v9.4L12 21l-7.5-4.3V7.3L12 3Z"/><path d="M4.5 7.3 12 11.6l7.5-4.3"/></svg>',
  doc:    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M7 3.5h7l3.5 3.5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V7h3.5M9 12h6M9 15.5h6"/></svg>'
};

// =============================================================
// CONCEPT GROUPS — Agrupación para Needs Review
// =============================================================
const CONCEPT_GROUPS = [
  { keywords: ['ec2 '], label: 'Amazon EC2' },
  { keywords: ['lambda', 'serverless'], label: 'AWS Lambda' },
  { keywords: ['ecs', 'eks', 'fargate', 'contenedor', 'container'], label: 'Contenedores (ECS/EKS/Fargate)' },
  { keywords: ['auto scaling'], label: 'EC2 Auto Scaling' },
  { keywords: ['elastic beanstalk'], label: 'AWS Elastic Beanstalk' },
  { keywords: ['s3 lifecycle', 'ciclo de vida'], label: 'S3 Lifecycle Policies' },
  { keywords: ['s3 '], label: 'Amazon S3' },
  { keywords: ['glacier'], label: 'S3 Glacier' },
  { keywords: ['ebs'], label: 'Amazon EBS' },
  { keywords: ['efs'], label: 'Amazon EFS' },
  { keywords: ['fsx'], label: 'Amazon FSx' },
  { keywords: ['storage gateway'], label: 'AWS Storage Gateway' },
  { keywords: ['snowball'], label: 'AWS Snow Family' },
  { keywords: ['rds'], label: 'Amazon RDS' },
  { keywords: ['aurora'], label: 'Amazon Aurora' },
  { keywords: ['dynamodb'], label: 'Amazon DynamoDB' },
  { keywords: ['elasticache'], label: 'Amazon ElastiCache' },
  { keywords: ['redshift'], label: 'Amazon Redshift' },
  { keywords: ['neptune'], label: 'Amazon Neptune' },
  { keywords: ['documentdb'], label: 'Amazon DocumentDB' },
  { keywords: ['vpc'], label: 'Amazon VPC' },
  { keywords: ['route 53', 'route53'], label: 'Amazon Route 53' },
  { keywords: ['cloudfront'], label: 'Amazon CloudFront' },
  { keywords: ['direct connect'], label: 'AWS Direct Connect' },
  { keywords: ['transit gateway'], label: 'AWS Transit Gateway' },
  { keywords: ['global accelerator'], label: 'AWS Global Accelerator' },
  { keywords: ['elastic load', 'elb'], label: 'Elastic Load Balancing' },
  { keywords: ['iam role'], label: 'IAM Roles' },
  { keywords: ['iam policy'], label: 'IAM Policies' },
  { keywords: ['iam user'], label: 'IAM Users' },
  { keywords: ['iam '], label: 'IAM' },
  { keywords: ['kms', 'cifrado', 'encryption'], label: 'AWS KMS' },
  { keywords: ['cloudhsm'], label: 'AWS CloudHSM' },
  { keywords: ['secrets manager'], label: 'AWS Secrets Manager' },
  { keywords: ['certificate manager', 'acm', 'ssl', 'tls'], label: 'AWS Certificate Manager' },
  { keywords: ['waf'], label: 'AWS WAF' },
  { keywords: ['shield'], label: 'AWS Shield' },
  { keywords: ['guardduty'], label: 'Amazon GuardDuty' },
  { keywords: ['inspector'], label: 'Amazon Inspector' },
  { keywords: ['macie'], label: 'Amazon Macie' },
  { keywords: ['security hub'], label: 'AWS Security Hub' },
  { keywords: ['artifact'], label: 'AWS Artifact' },
  { keywords: ['config'], label: 'AWS Config' },
  { keywords: ['cloudtrail'], label: 'AWS CloudTrail' },
  { keywords: ['mfa'], label: 'MFA' },
  { keywords: ['cognito'], label: 'Amazon Cognito' },
  { keywords: ['cloudwatch'], label: 'Amazon CloudWatch' },
  { keywords: ['cloudformation'], label: 'AWS CloudFormation' },
  { keywords: ['systems manager', 'ssm'], label: 'AWS Systems Manager' },
  { keywords: ['trusted advisor'], label: 'AWS Trusted Advisor' },
  { keywords: ['organizations', 'scp'], label: 'AWS Organizations' },
  { keywords: ['well-architected'], label: 'Well-Architected Framework' },
  { keywords: ['athena'], label: 'Amazon Athena' },
  { keywords: ['glue'], label: 'AWS Glue' },
  { keywords: ['quicksight'], label: 'Amazon QuickSight' },
  { keywords: ['sqs'], label: 'Amazon SQS' },
  { keywords: ['sns'], label: 'Amazon SNS' },
  { keywords: ['eventbridge'], label: 'Amazon EventBridge' },
  { keywords: ['step functions'], label: 'AWS Step Functions' },
  { keywords: ['cost explorer'], label: 'AWS Cost Explorer' },
  { keywords: ['budgets'], label: 'AWS Budgets' },
  { keywords: ['pricing calculator'], label: 'AWS Pricing Calculator' },
  { keywords: ['reserved instances'], label: 'Reserved Instances' },
  { keywords: ['savings plans'], label: 'Savings Plans' },
  { keywords: ['spot instance'], label: 'Spot Instances' },
  { keywords: ['support plan'], label: 'AWS Support Plans' },
  { keywords: ['free tier'], label: 'AWS Free Tier' },
  { keywords: ['rehost', 'lift and shift'], label: 'Estrategias: Rehost' },
  { keywords: ['replatform'], label: 'Estrategias: Replatform' },
  { keywords: ['refactor'], label: 'Estrategias: Refactor' },
  { keywords: ['repurchase'], label: 'Estrategias: Repurchase' },
  { keywords: ['retire'], label: 'Estrategias: Retire' },
  { keywords: ['retain'], label: 'Estrategias: Retain' }
];

function getCanonicalConcept(record) {
  const text = `${record.concept || ''} ${record.service || ''}`.toLowerCase();
  for (const group of CONCEPT_GROUPS) {
    for (const kw of group.keywords) {
      if (text.includes(kw.toLowerCase())) return group.label;
    }
  }
  if (record.service && record.service.length < 40 && /^[A-Z]/.test(record.service)) {
    return record.service;
  }
  return record.concept || 'Otros';
}

// =============================================================
// TRANSLATIONS
// =============================================================
const TRANSLATIONS = {
  es: {
    navPractice: 'Practice Mode',
    navLearning: 'Learning Hub',
    navFinal: 'Final Report',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    needsReview: 'NECESITA REPASO',
    needsReviewSub: 'Conceptos que requieren tu atención.',
    reviewEmpty: '✓ No hay conceptos pendientes de repaso',
    studyTip: 'Consejo de estudio',
    studyTipDefault: 'Enfócate en los conceptos donde tienes más errores.',
    loading: 'Cargando...',
    submitBtn: 'Enviar respuesta',
    hintBtn: 'Ver pista',
    hintBtn1: 'Ver pista 1',
    hintBtnN: (n) => `Ver pista ${n}`,
    hintExhausted: 'Sin más pistas',
    hintUsed: 'Pista usada',
    nextBtn: 'Siguiente',
    onTrack: 'En ritmo',
    awsMsgStart: 'Empieza a practicar para subir tu AWS Level.',
    awsMsgGreat: '¡Excelente dominio sin ayuda!',
    awsMsgGood: 'Buen dominio. Refuerza los fallos.',
    awsMsgReinforce: 'Es momento de reforzar los fundamentos.',
    yourProgress: 'TU PROGRESO',
    mastered: 'DOMINADAS',
    masteredNote: 'primer intento',
    recovered: 'RECUPERADAS',
    recoveredNote: 'con pista',
    unresolved: 'NO RESUELTAS',
    unresolvedNote: 'incorrectas',
    needsReviewKpi: 'NECESITA REPASO',
    needsReviewNote: 'conceptos únicos',
    progressByDomain: 'PROGRESO POR DOMINIO',
    newSimulator: 'Nuevo Simulador',
    settings: 'Configuración',
    settingsTitle: 'Ajustes de Aprendizaje',
    studyMode: 'Modo de estudio',
    domainsLabel: 'Dominios',
    showHints: 'Mostrar pistas',
    secondHint: 'Segunda pista',
    showExplanation: 'Mostrar explicación inmediatamente',
    animations: 'Animaciones',
    saveRestart: 'Guardar y Reiniciar',
    aboutProject: 'Acerca del proyecto',
    contact: 'Contacto',
    cancel: 'Cancelar',
    restart: 'Reiniciar',
    correctTitle: '✓ Correcto',
    recoveredTitle: '✓ Recuperada con pista',
    incorrectTitle: '✗ Incorrecto',
    incorrectBody: 'Tienes una pista disponible. Después podrás intentarlo una vez más.',
    unresolvedTitle: '✕ No resuelta',
    unresolvedBody: (n) => `La respuesta correcta era ${n}.`,
    questionCounter: (n, total) => `Pregunta ${n} de ${total}`,
    awsLevelLabel: 'AWS LEVEL',
    awsLevelSub: 'Dominio sin ayuda · primer intento',
    awsLevelTooltip: 'Porcentaje de preguntas respondidas correctamente al primer intento, sin utilizar pistas ni ayuda adicional.',
    examReadiness: 'EXAM READINESS',
    domainReadiness: 'DOMAIN READINESS',
    examReadinessTooltip: 'Estimamos que actualmente te encuentras en este nivel de preparación para el examen AWS Certified Cloud Practitioner.',
    domainReadinessTooltip: 'Estimación de preparación para este dominio específico.',
    successEstimateLabel: 'CLF-C02 EXAM SUCCESS ESTIMATE',
    firstAttempt: '1er intento',
    firstAttemptNote: (n) => `${n} correctas sin asistencia`,
    resultByDomain: 'Resultado por dominio',
    resultByDomainCorrect: 'correctas',
    resultByDomainWeight: 'del examen',
    needsStudy: '📚 Necesita estudio',
    finalDisclaimer: 'Este resultado es una métrica interna de <strong>ValenciaF. Carlos DevOps</strong>. No representa una puntuación oficial de AWS.',
    repeatSim: 'Repetir simulación',
    retryFailed: 'Reintentar solo fallados',
    noErrorsYet: '✓ No hay conceptos con errores.',
    resources: '📚 Recursos de Estudio',
    topConcepts: '🎯 Conceptos con Más Errores',
    statsTitle: '📊 Estadísticas de Aprendizaje',
    statsTotal: 'Preguntas totales practicadas',
    statsMastered: 'Dominadas al primer intento',
    statsRecovered: 'Recuperadas con pista',
    statsUnresolved: 'Sin resolver',
    learningHubSub: 'Explora los servicios de AWS y refuerza tus conocimientos',
    clickForMore: 'Click para más info →',
    welcomeCta: 'Comenzar simulación',
    welcomeCtaDisabled: 'Elige la cantidad de preguntas',
    notEvaluated: 'No evaluado',
    // Modales nuevos
    sessionFoundTitle: 'Sesión guardada detectada',
    sessionFoundBody: 'Tienes una sesión guardada con:',
    sessionAnswered: 'Respondidas',
    sessionPending: 'Pendientes',
    sessionFoundQuestion: '¿Quieres continuar donde lo dejaste o empezar una nueva sesión desde cero?',
    sessionContinue: 'Continuar sesión',
    sessionNew: 'Iniciar nueva sesión',
    confirmNewSimTitle: '¿Iniciar nuevo simulador?',
    confirmNewSimBody: 'Perderás el progreso actual de esta sesión.',
    confirmNewSimQuestion: '¿Deseas continuar?',
    confirmContinue: 'Continuar',
    unresolvedModalTitle: 'Incorrecto',
    unresolvedCorrectAnswer: 'Respuesta correcta',
    unresolvedExplanation: 'Explicación',
    unresolvedConcept: '📖 Concepto relacionado',
    unresolvedUnderstood: 'Entendido',
    timeExpiredTitle: 'Time Expired',
    timeExpiredBody: 'El tiempo del examen ha terminado.',
    timeExpiredQuestion: 'Si hubiera sido el examen oficial AWS CLF-C02, tu intento habría terminado aquí.',
    timeExpiredAnswered: 'Respondidas',
    timeExpiredPending: 'Sin responder',
    viewResults: 'Ver resultados'
  },
  en: {
    navPractice: 'Practice Mode',
    navLearning: 'Learning Hub',
    navFinal: 'Final Report',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    needsReview: 'NEEDS REVIEW',
    needsReviewSub: 'Concepts that require your attention.',
    reviewEmpty: '✓ No concepts pending review',
    studyTip: 'Study tip',
    studyTipDefault: 'Focus on the concepts where you have the most errors.',
    loading: 'Loading...',
    submitBtn: 'Submit answer',
    hintBtn: 'Show hint',
    hintBtn1: 'View hint 1',
    hintBtnN: (n) => `View hint ${n}`,
    hintExhausted: 'Hints exhausted',
    hintUsed: 'Hint used',
    nextBtn: 'Next',
    onTrack: 'On track',
    awsMsgStart: 'Start practicing to raise your AWS Level.',
    awsMsgGreat: 'Excellent mastery without help!',
    awsMsgGood: 'Good mastery. Reinforce the missed concepts.',
    awsMsgReinforce: 'Time to reinforce the fundamentals.',
    yourProgress: 'YOUR PROGRESS',
    mastered: 'MASTERED',
    masteredNote: 'first attempt',
    recovered: 'RECOVERED',
    recoveredNote: 'with hint',
    unresolved: 'UNRESOLVED',
    unresolvedNote: 'incorrect',
    needsReviewKpi: 'NEEDS REVIEW',
    needsReviewNote: 'unique concepts',
    progressByDomain: 'PROGRESS BY DOMAIN',
    newSimulator: 'New Simulator',
    settings: 'Settings',
    settingsTitle: 'Learning Settings',
    studyMode: 'Study mode',
    domainsLabel: 'Domains',
    showHints: 'Show hints',
    secondHint: 'Second hint',
    showExplanation: 'Show explanation immediately',
    animations: 'Animations',
    saveRestart: 'Save & Restart',
    aboutProject: 'About',
    contact: 'Contact',
    cancel: 'Cancel',
    restart: 'Restart',
    correctTitle: '✓ Correct',
    recoveredTitle: '✓ Recovered with hint',
    incorrectTitle: '✗ Incorrect',
    incorrectBody: 'A hint is available. You can try once more.',
    unresolvedTitle: '✕ Unresolved',
    unresolvedBody: (n) => `The correct answer was ${n}.`,
    questionCounter: (n, total) => `Question ${n} of ${total}`,
    awsLevelLabel: 'AWS LEVEL',
    awsLevelSub: 'Mastery without help · first attempt',
    awsLevelTooltip: 'Percentage of questions answered correctly on the first attempt, without using hints or additional help.',
    examReadiness: 'EXAM READINESS',
    domainReadiness: 'DOMAIN READINESS',
    examReadinessTooltip: 'We estimate your current preparation level for the AWS Certified Cloud Practitioner exam.',
    domainReadinessTooltip: 'Preparation estimate for this specific domain.',
    successEstimateLabel: 'CLF-C02 EXAM SUCCESS ESTIMATE',
    firstAttempt: '1st attempt',
    firstAttemptNote: (n) => `${n} correct without assistance`,
    resultByDomain: 'Result by domain',
    resultByDomainCorrect: 'correct',
    resultByDomainWeight: 'of exam',
    needsStudy: '📚 Needs study',
    finalDisclaimer: 'This result is an internal metric from <strong>ValenciaF. Carlos DevOps</strong>.',
    repeatSim: 'Repeat simulation',
    retryFailed: 'Retry failed only',
    noErrorsYet: '✓ No concepts with errors.',
    resources: '📚 Study Resources',
    topConcepts: '🎯 Concepts with Most Errors',
    statsTitle: '📊 Learning Statistics',
    statsTotal: 'Total questions practiced',
    statsMastered: 'Mastered on first attempt',
    statsRecovered: 'Recovered with hint',
    statsUnresolved: 'Unresolved',
    learningHubSub: 'Explore AWS services and reinforce your knowledge',
    clickForMore: 'Click for more info →',
    welcomeCta: 'Start simulation',
    welcomeCtaDisabled: 'Choose the number of questions',
    notEvaluated: 'Not evaluated',
    sessionFoundTitle: 'Saved session detected',
    sessionFoundBody: 'You have a saved session with:',
    sessionAnswered: 'Answered',
    sessionPending: 'Pending',
    sessionFoundQuestion: 'Do you want to continue where you left off or start fresh?',
    sessionContinue: 'Continue session',
    sessionNew: 'Start new session',
    confirmNewSimTitle: 'Start new simulator?',
    confirmNewSimBody: 'You will lose the current session progress.',
    confirmNewSimQuestion: 'Do you want to continue?',
    confirmContinue: 'Continue',
    unresolvedModalTitle: 'Incorrect',
    unresolvedCorrectAnswer: 'Correct answer',
    unresolvedExplanation: 'Explanation',
    unresolvedConcept: '📖 Related concept',
    unresolvedUnderstood: 'Understood',
    timeExpiredTitle: 'Time Expired',
    timeExpiredBody: 'The exam time has ended.',
    timeExpiredQuestion: 'If this had been the official AWS CLF-C02 exam, your attempt would have ended here.',
    timeExpiredAnswered: 'Answered',
    timeExpiredPending: 'Unanswered',
    viewResults: 'View results'
  }
};

// =============================================================
// STATE
// =============================================================
const state = {
  allQuestions: [],
  activeQuestions: [],
  currentIndex: 0,
  sessionId: null,
  awsLevel: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalAttempts: 0,
  correctFirstAttempt: 0,
  correctAfterHint: 0,
  unresolved: 0,
  perQuestion: {},
  selectedLetter: null,
  currentAttempt: 0,
  answeredThisQuestion: false,
  hintUsedThisQuestion: false,
  expandedReviewDomains: new Set(),
  currentView: 'practice',
  theme: 'light',
  lang: 'es',
  // Timer
  mode: 'practice',            // 'practice' | 'exam'
  timerStartAt: null,          // timestamp
  timerTotalSeconds: 0,        // duración total
  timerIntervalId: null,
  timerExpired: false,
  // Concept Insight
  lastWeakConcept: 'default',  // concepto actual mostrado en el panel
  // Tip rotativo
  currentTipIndex: 0,
  // Modales
  pendingUnresolvedQuestion: null,
  settings: {
    questionCount: 100,
    domain: 'all',
    showHints: true,
    secondHint: false,
    immediateExplanation: true,
    animations: true
  }
};

let pendingSession = null;

// =============================================================
// HELPERS
// =============================================================
function t(key, ...args) {
  const entry = TRANSLATIONS[state.lang][key];
  return typeof entry === 'function' ? entry(...args) : entry;
}

function normalizeDomain(domain) {
  if (!domain) return 'General';
  return domain.replace(/&amp;/gi, '&').trim();
}

function getDomainDef(key) {
  return DOMAIN_DEFS[key] || { color: 'gray', icon: 'cloud', weight: 0 };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      sessionId: state.sessionId,
      currentIndex: state.currentIndex,
      awsLevel: state.awsLevel,
      currentStreak: state.currentStreak,
      bestStreak: state.bestStreak,
      totalAttempts: state.totalAttempts,
      correctFirstAttempt: state.correctFirstAttempt,
      correctAfterHint: state.correctAfterHint,
      unresolved: state.unresolved,
      perQuestion: state.perQuestion,
      settings: state.settings,
      mode: state.mode,
      timerStartAt: state.timerStartAt,
      timerTotalSeconds: state.timerTotalSeconds,
      activeQuestionsIds: state.activeQuestions.map(q => q.id)
    }));
  } catch (e) { console.warn('saveState error:', e); }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

// =============================================================
// THEME
// =============================================================
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  state.theme = saved || 'light';
  applyTheme();
}
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const label = document.getElementById('themeLabel');
  if (label) label.textContent = state.theme === 'dark' ? t('lightMode') : t('darkMode');
}
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, state.theme);
  applyTheme();
}

// =============================================================
// LANGUAGE
// =============================================================
function initLang() {
  const saved = localStorage.getItem(LANG_KEY);
  state.lang = saved || 'es';
  document.documentElement.lang = state.lang;
  const label = document.getElementById('langCurrentLabel');
  if (label) label.textContent = state.lang.toUpperCase();
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === state.lang);
  });
}

function setLang(lang) {
  state.lang = lang === 'en' ? 'en' : 'es';
  localStorage.setItem(LANG_KEY, state.lang);
  document.documentElement.lang = state.lang;
  const label = document.getElementById('langCurrentLabel');
  if (label) label.textContent = state.lang.toUpperCase();
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === state.lang);
  });
  applyStaticTranslations();
  initTicker();
  renderAll();
  renderConceptInsight();

  const overlay = document.getElementById('welcomeOverlay');
  if (overlay && !overlay.classList.contains('hidden')) {
    const hero = document.getElementById('welcomeDomainHero');
    const currentDomain = hero?.dataset.domain || 'all';
    renderDomainHero(currentDomain);
    updateDomainToggleLabel(currentDomain);
    updateWelcomeCTA();
  }
}

function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (typeof val === 'string') el.textContent = val;
  });
}

// =============================================================
// LOAD QUESTIONS
// =============================================================
const LOTES = [
  'clf-c02-lote-1.json',  'clf-c02-lote-2.json',
  'clf-c02-lote-3.json',  'clf-c02-lote-4.json',
  'clf-c02-lote-5.json',  'clf-c02-lote-6.json',
  'clf-c02-lote-7.json',  'clf-c02-lote-8.json',
  'clf-c02-lote-9.json',  'clf-c02-lote-10.json',
  'clf-c02-lote-11.json', 'clf-c02-lote-12.json'
];

async function loadQuestions() {
  try {
    console.log('📦 Cargando', LOTES.length, 'lotes de preguntas...');

    const loteResults = await Promise.all(
      LOTES.map(async (name) => {
        try {
          const r = await fetch(`./data/${name}`);
          if (!r.ok) return { name, status: r.status, questions: [] };
          const data = await r.json();
          const arr = Array.isArray(data) ? data : (data.questions || []);
          return { name, status: 200, questions: arr };
        } catch (err) {
          return { name, status: 'ERROR', questions: [], error: err.message };
        }
      })
    );

    console.table(loteResults.map(r => ({
      Lote: r.name, Status: r.status, Preguntas: r.questions.length
    })));

    const allQuestions = loteResults.flatMap(r => r.questions);
    if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
      throw new Error('No se cargó ninguna pregunta.');
    }

    state.allQuestions = allQuestions;
    console.log(`✅ Total cargado: ${allQuestions.length} preguntas`);

    const saved = loadState();
    if (saved && saved.activeQuestionsIds && saved.activeQuestionsIds.length > 0) {
      const restored = saved.activeQuestionsIds
        .map(id => allQuestions.find(q => q.id === id))
        .filter(Boolean);

      if (restored.length > 0) {
        pendingSession = { ...saved, restoredQuestions: restored };
        window.__pendingSession = pendingSession;
        console.log(`💾 Sesión previa detectada (${restored.length} preguntas).`);

        // Mostrar modal de sesión encontrada en lugar de banner
        showSessionFoundModal(restored.length, saved);
      }
    }
  } catch (error) {
    console.error('❌ Error cargando preguntas:', error);
    const qt = document.getElementById('questionText');
    if (qt) qt.textContent = `Error: ${error.message}`;
  }
}

function restoreSession() {
  if (!pendingSession) return false;
  const { restoredQuestions, ...saved } = pendingSession;

  state.activeQuestions = restoredQuestions;
  state.sessionId = saved.sessionId;
  state.currentIndex = saved.currentIndex || 0;
  state.awsLevel = saved.awsLevel ?? 0;
  state.currentStreak = saved.currentStreak || 0;
  state.bestStreak = saved.bestStreak || 0;
  state.totalAttempts = saved.totalAttempts || 0;
  state.correctFirstAttempt = saved.correctFirstAttempt || 0;
  state.correctAfterHint = saved.correctAfterHint || 0;
  state.unresolved = saved.unresolved || 0;
  state.perQuestion = saved.perQuestion || {};
  state.settings = { ...state.settings, ...(saved.settings || {}) };
  state.mode = saved.mode || 'practice';
  state.timerStartAt = saved.timerStartAt || null;
  state.timerTotalSeconds = saved.timerTotalSeconds || 0;

  pendingSession = null;
  window.__pendingSession = null;

  const quizCard = document.querySelector('.quiz-card');
  if (quizCard && !document.getElementById('questionCounter')) {
    quizCard.innerHTML = getPracticeTemplate();
    bindPracticeEvents();
  }

  state.currentView = 'practice';
  renderAll();

  // Restaurar timer si estábamos en modo examen
  if (state.mode === 'exam' && state.timerStartAt) {
    startExamTimer(state.timerTotalSeconds, state.timerStartAt);
  }

  return true;
}

// =============================================================
// SAMPLE ESTRATIFICADO
// =============================================================
function calculateStratifiedCounts(totalSize) {
  if (MIXED_DISTRIBUTIONS[totalSize]) {
    return { ...MIXED_DISTRIBUTIONS[totalSize] };
  }
  // Fallback (por si acaso)
  const domains = Object.keys(EXAM_WEIGHTS);
  const raw = {};
  const floors = {};
  let sumFloors = 0;

  domains.forEach(d => {
    raw[d] = totalSize * EXAM_WEIGHTS[d];
    floors[d] = Math.floor(raw[d]);
    sumFloors += floors[d];
  });

  const remaining = totalSize - sumFloors;
  const sorted = domains
    .map(d => ({ domain: d, remainder: raw[d] - Math.floor(raw[d]) }))
    .sort((a, b) => b.remainder - a.remainder);

  const counts = { ...floors };
  for (let i = 0; i < remaining; i++) counts[sorted[i].domain] += 1;

  if (totalSize >= domains.length) {
    domains.forEach(d => {
      if (counts[d] < 1) {
        const donor = domains.filter(x => x !== d).sort((a, b) => counts[b] - counts[a])[0];
        if (counts[donor] > 1) { counts[donor] -= 1; counts[d] += 1; }
      }
    });
  }
  return counts;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sampleQuestionsByWeight(totalSize, domainFilter = 'all') {
  let bank = [...state.allQuestions];

  if (domainFilter !== 'all') {
    bank = bank.filter(q => normalizeDomain(q.domain) === domainFilter);
    shuffleArray(bank);
    return bank.slice(0, totalSize);
  }

  const counts = calculateStratifiedCounts(totalSize);
  const byDomain = {};
  Object.keys(EXAM_WEIGHTS).forEach(d => { byDomain[d] = []; });
  bank.forEach(q => {
    const d = normalizeDomain(q.domain);
    if (byDomain[d]) byDomain[d].push(q);
  });

  const selected = [];
  Object.entries(counts).forEach(([domain, count]) => {
    const pool = byDomain[domain] || [];
    shuffleArray(pool);
    selected.push(...pool.slice(0, Math.min(count, pool.length)));
  });

  shuffleArray(selected);
  return selected;
}

// =============================================================
// SESSION
// =============================================================
function startNewSession() {
  if (!state.allQuestions || state.allQuestions.length === 0) {
    console.warn('No hay preguntas cargadas todavía.');
    return;
  }

  const totalSize = state.settings.questionCount || 100;
  const domainFilter = state.settings.domain || 'all';

  const pool = sampleQuestionsByWeight(totalSize, domainFilter);
  if (pool.length === 0) {
    console.error('No hay preguntas para la configuración elegida.');
    return;
  }

  state.activeQuestions = pool;
  state.sessionId = Date.now().toString();
  state.currentIndex = 0;
  state.awsLevel = 0;
  state.currentStreak = 0;
  state.bestStreak = 0;
  state.totalAttempts = 0;
  state.correctFirstAttempt = 0;
  state.correctAfterHint = 0;
  state.unresolved = 0;
  state.perQuestion = {};
  state.currentView = 'practice';
  state.lastWeakConcept = 'default';
  state.timerExpired = false;
  state.pendingUnresolvedQuestion = null;
  pendingSession = null;
  window.__pendingSession = null;

  pool.forEach(q => {
    state.perQuestion[q.id] = {
      id: q.id,
      domain: normalizeDomain(q.domain),
      concept: q.concept || 'Concepto sin especificar',
      service: q.service || '',
      explanation: q.explanation || '',
      state: Q_STATE.UNSEEN,
      attempts: 0,
      firstAttemptCorrect: false,
      usedHint: false,
      correctAfterHint: false,
      recovered: false,
      unresolved: false,
      hadError: false,
      history: []
    };
  });

  const dist = {};
  pool.forEach(q => {
    const d = normalizeDomain(q.domain);
    dist[d] = (dist[d] || 0) + 1;
  });
  console.log('🎲 Sesión generada:', dist);

  const quizCard = document.querySelector('.quiz-card');
  if (quizCard && !document.getElementById('questionCounter')) {
    quizCard.innerHTML = getPracticeTemplate();
    bindPracticeEvents();
  }

  // Iniciar timer si modo examen
  if (state.mode === 'exam') {
    const minutes = EXAM_TIME_MINUTES[totalSize] || 60;
    const totalSeconds = minutes * 60;
    startExamTimer(totalSeconds, Date.now());
  } else {
    stopExamTimer();
  }

  saveState();
  renderAll();
}

// =============================================================
// EXAM TIMER
// =============================================================
function startExamTimer(totalSeconds, startAt) {
  stopExamTimer();
  state.timerTotalSeconds = totalSeconds;
  state.timerStartAt = startAt || Date.now();
  state.timerExpired = false;

  const timerEl = document.getElementById('examTimer');
  if (timerEl) timerEl.classList.remove('hidden');

  updateTimerDisplay();

  state.timerIntervalId = setInterval(() => {
    updateTimerDisplay();
    const elapsed = Math.floor((Date.now() - state.timerStartAt) / 1000);
    const remaining = state.timerTotalSeconds - elapsed;

    if (remaining <= 0) {
      clearInterval(state.timerIntervalId);
      state.timerIntervalId = null;
      handleTimerExpired();
    }
  }, 1000);
}

function stopExamTimer() {
  if (state.timerIntervalId) {
    clearInterval(state.timerIntervalId);
    state.timerIntervalId = null;
  }
  const timerEl = document.getElementById('examTimer');
  if (timerEl) timerEl.classList.add('hidden');
}

function updateTimerDisplay() {
  const timerValueEl = document.getElementById('examTimerValue');
  const timerEl = document.getElementById('examTimer');
  if (!timerValueEl) return;

  const elapsed = Math.floor((Date.now() - state.timerStartAt) / 1000);
  const remaining = Math.max(0, state.timerTotalSeconds - elapsed);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  timerValueEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (timerEl) {
    timerEl.classList.remove('is-warning', 'is-critical');
    if (remaining <= 60) timerEl.classList.add('is-critical');
    else if (remaining <= 300) timerEl.classList.add('is-warning');
  }
}

function handleTimerExpired() {
  console.log('⏰ Time expired');
  state.timerExpired = true;
  state.answeredThisQuestion = true; // bloquear submit
  saveState();

  // Calcular respondidas / no respondidas
  const total = state.activeQuestions.length;
  const answered = Object.values(state.perQuestion).filter(r => r.state !== Q_STATE.UNSEEN).length;
  const pending = total - answered;

  document.getElementById('timeExpiredAnswered').textContent = answered;
  document.getElementById('timeExpiredPending').textContent = pending;

  // Marcar las no respondidas como UNRESOLVED
  Object.values(state.perQuestion).forEach(r => {
    if (r.state === Q_STATE.UNSEEN) {
      r.state = Q_STATE.UNRESOLVED;
      r.unresolved = true;
      state.unresolved += 1;
    }
  });

  const overlay = document.getElementById('timeExpiredOverlay');
  if (overlay) overlay.classList.remove('hidden');
}

// =============================================================
// RENDER
// =============================================================
function renderAll() {
  if (state.currentView === 'practice') {
    renderQuestion();
    renderTopMetrics();
    renderProgressCard();
    renderDomainProgress();
    renderReviewList();
    renderConceptInsight();
  }
}

function renderQuestion() {
  const q = state.activeQuestions[state.currentIndex];
  if (!q) return;

  const domainDef = getDomainDef(normalizeDomain(q.domain));

  state.selectedLetter = null;
  state.currentAttempt = 0;
  state.answeredThisQuestion = false;
  state.hintUsedThisQuestion = false;

  document.getElementById('questionCounter').textContent = t('questionCounter', state.currentIndex + 1, state.activeQuestions.length);
  const pct = Math.round(((state.currentIndex + 1) / state.activeQuestions.length) * 100);
  document.getElementById('questionProgressBar').style.width = `${pct}%`;
  document.getElementById('questionPercent').textContent = `${pct}%`;

  const domainBadge = document.getElementById('domainBadge');
  domainBadge.innerHTML = `${DOMAIN_ICONS[domainDef.icon] || ''} ${normalizeDomain(q.domain)}`;
  domainBadge.className = `badge badge--${domainDef.color}`;
  document.getElementById('examWeightBadge').textContent = `${domainDef.weight}%`;

  document.getElementById('questionText').textContent = q.question;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';
  Object.entries(q.options).forEach(([letter, text]) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.dataset.letter = letter;
    btn.innerHTML = `
      <span class="option__marker">${letter}</span>
      <span class="option__text">${text}</span>
    `;
    btn.addEventListener('click', () => selectOption(letter, btn));
    optionsContainer.appendChild(btn);
  });

  const submitBtn = document.getElementById('submitBtn');
  const hintBtn = document.getElementById('hintBtn');
  const nextBtn = document.getElementById('nextBtn');

  submitBtn.disabled = true;
  hintBtn.disabled = true;
  nextBtn.disabled = true;

  if (state.settings.showHints) {
    hintBtn.innerHTML = `
      <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M8 14.5A5.5 5.5 0 1 1 16 14.5c-.8.9-1.5 1.6-1.5 2.5h-5c0-.9-.7-1.6-1.5-2.5Z"/></svg>
      <span id="hintBtnLabel">${t('hintBtn')}</span>
    `;
  } else {
    hintBtn.innerHTML = `<span id="hintBtnLabel">${t('hintBtn')}</span>`;
  }

  const feedback = document.getElementById('feedbackArea');
  feedback.className = 'feedback hidden';
  feedback.innerHTML = '';

  // Rotar tip al cambiar de pregunta
  rotateTip();

  bindPracticeEvents();
}

function selectOption(letter, btn) {
  if (state.answeredThisQuestion) return;
  state.selectedLetter = letter;
  document.querySelectorAll('.option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('submitBtn').disabled = false;
}

// =============================================================
// SUBMIT — 3 estados
// =============================================================
function submitAnswer() {
  if (state.answeredThisQuestion || !state.selectedLetter) return;

  const q = state.activeQuestions[state.currentIndex];
  const record = state.perQuestion[q.id];
  const letter = state.selectedLetter;
  const isCorrect = Array.isArray(q.correct) && q.correct.length === 1 && q.correct[0] === letter;

  state.currentAttempt += 1;
  state.totalAttempts += 1;
  record.attempts += 1;
  record.history.push({ attempt: state.currentAttempt, letter, correct: isCorrect, usedHint: state.hintUsedThisQuestion });

  if (isCorrect) handleCorrectAnswer(q, record, letter);
  else handleIncorrectAnswer(q, record, letter);

  updateAwsLevel();
  saveState();
  renderTopMetrics();
  renderProgressCard();
  renderDomainProgress();
  renderReviewList();
}

function handleCorrectAnswer(q, record, letter) {
  const isFirstAttempt = state.currentAttempt === 1;
  if (isFirstAttempt) {
    record.state = Q_STATE.ANSWERED_CORRECT;
    record.firstAttemptCorrect = true;
    state.correctFirstAttempt += 1;
  } else {
    record.state = Q_STATE.RECOVERED_WITH_HINT;
    record.correctAfterHint = true;
    record.recovered = true;
    state.correctAfterHint += 1;
    // Concept Insight: al recuperar, mostrar el concepto
    updateConceptInsight(record);
  }
  updateStreak(true);

  document.querySelectorAll('.option').forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('selected');
    if (q.correct.includes(btn.dataset.letter)) btn.classList.add('correct');
  });

  const feedback = document.getElementById('feedbackArea');
  feedback.className = 'feedback success';
  feedback.innerHTML = `<strong>${isFirstAttempt ? t('correctTitle') : t('recoveredTitle')}</strong>${state.settings.immediateExplanation ? (q.explanation || '') : ''}`;

  document.getElementById('submitBtn').disabled = true;
  document.getElementById('hintBtn').disabled = true;
  document.getElementById('nextBtn').disabled = false;
  state.answeredThisQuestion = true;
}

function handleIncorrectAnswer(q, record, letter) {
  const isFirstAttempt = state.currentAttempt === 1;
  if (!record.hadError) record.hadError = true;
  updateStreak(false);

  if (isFirstAttempt) {
    record.state = Q_STATE.REVIEW;
    const wrongBtn = document.querySelector(`.option[data-letter="${letter}"]`);
    if (wrongBtn) {
      wrongBtn.classList.remove('selected');
      wrongBtn.classList.add('incorrect');
      wrongBtn.disabled = true;
    }
    const feedback = document.getElementById('feedbackArea');
    feedback.className = 'feedback hint-open';
    feedback.innerHTML = `<strong>${t('incorrectTitle')}</strong>${t('incorrectBody')}`;

    state.selectedLetter = null;
    document.getElementById('submitBtn').disabled = true;
    document.querySelectorAll('.option').forEach(btn => {
      if (btn.dataset.letter !== letter) btn.disabled = false;
    });

    const hintBtn = document.getElementById('hintBtn');
    if (state.settings.showHints) {
      hintBtn.disabled = false;
      hintBtn.innerHTML = `
        <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M8 14.5A5.5 5.5 0 1 1 16 14.5c-.8.9-1.5 1.6-1.5 2.5h-5c0-.9-.7-1.6-1.5-2.5Z"/></svg>
        <span id="hintBtnLabel">${t('hintBtn1')}</span>
      `;
    }
  } else {
    // UNRESOLVED → mostrar modal bloqueante
    record.state = Q_STATE.UNRESOLVED;
    record.unresolved = true;
    state.unresolved += 1;
    state.answeredThisQuestion = true;

    document.querySelectorAll('.option').forEach(btn => {
      btn.disabled = true;
      btn.classList.remove('selected');
      if (btn.dataset.letter === letter) btn.classList.add('incorrect');
      if (q.correct.includes(btn.dataset.letter)) btn.classList.add('correct');
    });

    document.getElementById('submitBtn').disabled = true;
    document.getElementById('hintBtn').disabled = true;
    document.getElementById('nextBtn').disabled = false;

    // Actualizar Concept Insight con el concepto fallado
    updateConceptInsight(record);

    // Guardar pregunta pendiente
    state.pendingUnresolvedQuestion = { q, record };

    // Mostrar modal bloqueante
    showUnresolvedModal(q);
  }
}

function useHint() {
  const q = state.activeQuestions[state.currentIndex];
  const record = state.perQuestion[q.id];
  if (record.state !== Q_STATE.REVIEW) return;
  if (!state.settings.showHints) return;

  const hints = [q.hint1, q.hint2].filter(Boolean);
  const used = record.history.filter(h => h.usedHint).length;
  if (used >= hints.length) return;

  const feedback = document.getElementById('feedbackArea');
  feedback.className = 'feedback hint-open';
  feedback.innerHTML = `<strong>💡 ${used + 1} / ${hints.length}</strong>${hints[used]}`;

  record.usedHint = true;
  state.hintUsedThisQuestion = true;
  record.history.push({ hint: used + 1, usedHint: true });

  const hintBtn = document.getElementById('hintBtn');
  if (used + 1 >= hints.length) {
    hintBtn.disabled = true;
    hintBtn.innerHTML = `
      <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
      <span id="hintBtnLabel">${t('hintExhausted')}</span>
    `;
  } else if (state.settings.secondHint) {
    hintBtn.innerHTML = `
      <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M8 14.5A5.5 5.5 0 1 1 16 14.5c-.8.9-1.5 1.6-1.5 2.5h-5c0-.9-.7-1.6-1.5-2.5Z"/></svg>
      <span id="hintBtnLabel">${t('hintBtnN', used + 2)}</span>
    `;
  } else {
    hintBtn.disabled = true;
    hintBtn.innerHTML = `
      <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
      <span id="hintBtnLabel">${t('hintUsed')}</span>
    `;
  }
}

function nextQuestion() {
  if (!state.answeredThisQuestion) return;

  const q = state.activeQuestions[state.currentIndex];
  const record = state.perQuestion[q.id];
  if (record && record.state === Q_STATE.REVIEW) {
    record.state = Q_STATE.UNRESOLVED;
    record.unresolved = true;
    state.unresolved += 1;
  }

  if (state.currentIndex >= state.activeQuestions.length - 1) {
    state.currentView = 'final';
    stopExamTimer();
    showFinalReport();
    return;
  }
  state.currentIndex += 1;
  saveState();
  renderQuestion();
  renderTopMetrics();
}

// =============================================================
// MODALES
// =============================================================
function showSessionFoundModal(count, saved) {
  const overlay = document.getElementById('sessionFoundOverlay');
  if (!overlay) return;

  const total = saved.activeQuestionsIds?.length || count;
  const answered = Object.values(saved.perQuestion || {}).filter(r => r.state !== Q_STATE.UNSEEN).length;
  const pending = total - answered;

  document.getElementById('sessionAnswered').textContent = answered;
  document.getElementById('sessionPending').textContent = pending;

  // Ocultar welcome modal mientras se muestra el modal
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  if (welcomeOverlay) welcomeOverlay.classList.add('hidden');

  overlay.classList.remove('hidden');
}

function showUnresolvedModal(q) {
  const overlay = document.getElementById('unresolvedOverlay');
  if (!overlay) return;

  const correctLetter = q.correct[0];
  const correctText = q.options[correctLetter] || '';
  const conceptLabel = getCanonicalConcept(state.pendingUnresolvedQuestion.record);

  document.getElementById('unresolvedCorrectAnswer').textContent = `${correctLetter}) ${correctText}`;
  document.getElementById('unresolvedExplanation').textContent = q.explanation || '';
  document.getElementById('unresolvedConcept').textContent = conceptLabel;

  overlay.classList.remove('hidden');
}

function hideUnresolvedModal() {
  const overlay = document.getElementById('unresolvedOverlay');
  if (overlay) overlay.classList.add('hidden');
  state.pendingUnresolvedQuestion = null;
  // Auto-avanzar a la siguiente pregunta
  setTimeout(() => {
    if (state.currentView === 'practice') nextQuestion();
  }, 100);
}

// =============================================================
// METRICS
// =============================================================
function updateAwsLevel() {
  const total = state.activeQuestions.length;
  if (total === 0) { state.awsLevel = 0; return; }
  const mastered = Object.values(state.perQuestion).filter(r => r.state === Q_STATE.ANSWERED_CORRECT).length;
  state.awsLevel = Math.round((mastered / total) * 100);
}

function updateStreak(isCorrect) {
  const streakBadge = document.getElementById('streakBadge');
  if (!streakBadge) return;
  if (isCorrect) {
    state.currentStreak += 1;
    if (state.currentStreak > state.bestStreak) state.bestStreak = state.currentStreak;
    if (state.settings.animations) {
      streakBadge.style.animation = 'streakPulse 0.6s ease-in-out';
      setTimeout(() => { streakBadge.style.animation = ''; }, 600);
    }
  } else {
    state.currentStreak = 0;
  }
}

function renderTopMetrics() {
  const awsLevelEl = document.getElementById('awsLevelValue');
  const awsLevelBar = document.getElementById('awsLevelBar');
  const awsLevelMsg = document.getElementById('awsLevelMessage');

  if (awsLevelEl) awsLevelEl.textContent = state.awsLevel;
  if (awsLevelBar) awsLevelBar.style.width = `${state.awsLevel}%`;

  if (awsLevelMsg) {
    if (state.awsLevel >= 85) awsLevelMsg.textContent = t('awsMsgGreat');
    else if (state.awsLevel >= 60) awsLevelMsg.textContent = t('awsMsgGood');
    else if (state.awsLevel >= 30) awsLevelMsg.textContent = t('awsMsgReinforce');
    else awsLevelMsg.textContent = t('awsMsgStart');
  }

  const streakEl = document.getElementById('streakValue');
  if (streakEl) streakEl.textContent = state.currentStreak;
}

function renderProgressCard() {
  const total = state.activeQuestions.length;
  const records = Object.values(state.perQuestion);
  const completed = records.filter(r => r.state !== Q_STATE.UNSEEN).length;
  const mastered = records.filter(r => r.state === Q_STATE.ANSWERED_CORRECT).length;
  const recovered = records.filter(r => r.state === Q_STATE.RECOVERED_WITH_HINT).length;
  const unresolved = records.filter(r => r.state === Q_STATE.UNRESOLVED).length;

  const conceptMap = new Map();
  records.forEach(r => {
    if (r.state === Q_STATE.RECOVERED_WITH_HINT || r.state === Q_STATE.UNRESOLVED) {
      const label = getCanonicalConcept(r);
      if (!conceptMap.has(label)) conceptMap.set(label, { domain: r.domain, count: 0 });
      conceptMap.get(label).count += 1;
    }
  });

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  document.getElementById('dashCompleted').textContent = `${completed} / ${total}`;
  document.getElementById('dashPercent').textContent = `${pct}%`;
  document.getElementById('dashProgressFill').style.width = `${pct}%`;
  document.getElementById('dashMastered').textContent = mastered;
  document.getElementById('dashRecovered').textContent = recovered;
  document.getElementById('dashUnresolved').textContent = unresolved;
  document.getElementById('dashReview').textContent = conceptMap.size;
}

function renderDomainProgress() {
  const domainList = document.getElementById('domainList');
  if (!domainList) return;

  const stats = {};
  Object.keys(DOMAIN_DEFS).forEach(key => { stats[key] = { total: 0, correct: 0 }; });

  state.activeQuestions.forEach(q => {
    const domain = normalizeDomain(q.domain);
    if (stats[domain]) stats[domain].total += 1;
  });

  Object.values(state.perQuestion).forEach(r => {
    if (stats[r.domain]) {
      if (r.state === Q_STATE.ANSWERED_CORRECT || r.state === Q_STATE.RECOVERED_WITH_HINT) {
        stats[r.domain].correct += 1;
      }
    }
  });

  domainList.innerHTML = Object.entries(stats).map(([name, data]) => {
    const def = getDomainDef(name);

    if (data.total === 0) {
      return `
        <li class="domain-item domain-item--not-evaluated">
          <div class="domain-item__header">
            <span class="domain-item__icon domain-item__icon--${def.color}">${DOMAIN_ICONS[def.icon] || ''}</span>
            <span class="domain-item__name">${name}</span>
            <span class="domain-item__score">—</span>
          </div>
          <div class="progress progress--xs">
            <div class="progress__bar progress__bar--${def.color}" style="width: 0%"></div>
          </div>
          <span class="domain-item__pct">${t('notEvaluated')}</span>
        </li>
      `;
    }

    const pct = Math.round((data.correct / data.total) * 100);
    return `
      <li class="domain-item">
        <div class="domain-item__header">
          <span class="domain-item__icon domain-item__icon--${def.color}">${DOMAIN_ICONS[def.icon] || ''}</span>
          <span class="domain-item__name">${name}</span>
          <span class="domain-item__score">${data.correct} / ${data.total}</span>
        </div>
        <div class="progress progress--xs">
          <div class="progress__bar progress__bar--${def.color}" style="width: ${pct}%"></div>
        </div>
        <span class="domain-item__pct">${pct}%</span>
      </li>
    `;
  }).join('');
}

// =============================================================
// NEEDS REVIEW — RECOVERED + UNRESOLVED (conceptos únicos)
// =============================================================
function renderReviewList() {
  const reviewList = document.getElementById('reviewList');
  const reviewCountPill = document.getElementById('reviewCountPill');

  const conceptMap = new Map();
  Object.values(state.perQuestion).forEach(r => {
    if (r.state === Q_STATE.RECOVERED_WITH_HINT || r.state === Q_STATE.UNRESOLVED) {
      const label = getCanonicalConcept(r);
      if (!conceptMap.has(label)) conceptMap.set(label, { domain: r.domain, count: 0 });
      conceptMap.get(label).count += 1;
    }
  });

  const totalConcepts = conceptMap.size;
  reviewCountPill.textContent = totalConcepts;

  if (totalConcepts === 0) {
    reviewList.innerHTML = `<p class="review-empty">${t('reviewEmpty')}</p>`;
    return;
  }

  const byDomain = {};
  conceptMap.forEach((data, label) => {
    if (!byDomain[data.domain]) byDomain[data.domain] = [];
    byDomain[data.domain].push({ label, count: data.count });
  });

  reviewList.innerHTML = Object.entries(byDomain).map(([domain, items]) => {
    const def = getDomainDef(domain);
    const isExpanded = state.expandedReviewDomains.has(domain);
    return `
      <div class="review-group" data-domain="${domain}">
        <div class="review-group__header" onclick="toggleReviewGroup('${domain}')">
          <div class="review-group__icon review-group__icon--${def.color}">${DOMAIN_ICONS[def.icon] || ''}</div>
          <span class="review-group__name">${domain}</span>
          <span class="review-group__count">${items.length}</span>
          <span class="review-group__chevron" style="transform: rotate(${isExpanded ? '0' : '-90'}deg);">▼</span>
        </div>
        <ul class="review-group__items" style="display: ${isExpanded ? 'flex' : 'none'};">
          ${items.map(item => `<li>${item.label}${item.count > 1 ? ` <span style="color:var(--text-mute);font-size:11px;">×${item.count}</span>` : ''}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

function toggleReviewGroup(domain) {
  if (state.expandedReviewDomains.has(domain)) state.expandedReviewDomains.delete(domain);
  else state.expandedReviewDomains.add(domain);
  renderReviewList();
}
window.toggleReviewGroup = toggleReviewGroup;

// =============================================================
// CONCEPT INSIGHT — Último concepto que causó dificultad
// =============================================================
function updateConceptInsight(record) {
  if (!record) return;
  const label = getCanonicalConcept(record);
  if (label && label !== 'Otros') {
    state.lastWeakConcept = label;
    renderConceptInsight();
  }
}

function renderConceptInsight() {
  const container = document.getElementById('conceptInsightText');
  if (!container) return;

  const key = state.lastWeakConcept;
  const detail = CONCEPT_DETAILS[key] || CONCEPT_DETAILS['default'];

  container.innerHTML = `
    <div class="concept-insight__name">${detail.name}</div>
    <div class="concept-insight__text">${detail.text}</div>
    <div class="concept-insight__tip">
      <div class="concept-insight__tip-icon">💡</div>
      <div class="concept-insight__tip-text">
        <strong>Exam Tip</strong>
        ${detail.tip}
      </div>
    </div>
  `;
}

// =============================================================
// STUDY TIP ROTATIVO
// =============================================================
function rotateTip() {
  const tipEl = document.getElementById('studyTipText');
  if (!tipEl) return;

  // Elegir tip aleatorio distinto al actual
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * EXAM_TIPS.length);
  } while (newIndex === state.currentTipIndex && EXAM_TIPS.length > 1);

  state.currentTipIndex = newIndex;
  const tip = EXAM_TIPS[newIndex];
  tipEl.textContent = tip[state.lang] || tip.es;
}

// =============================================================
// FINAL REPORT
// =============================================================
function getSuccessEstimateStatus(value) {
  if (value >= 85) return {
    label: 'Highly Likely', class: 'high',
    description: 'Tu desempeño está fuertemente alineado con la distribución oficial del examen. Es muy probable que estés listo para presentarlo con confianza.'
  };
  if (value >= 75) return {
    label: 'Likely', class: 'mid',
    description: 'Tu desempeño está alineado con la distribución oficial del examen. Con algo más de práctica estarías listo.'
  };
  if (value >= 60) return {
    label: 'Possible', class: 'mid',
    description: 'Tu desempeño muestra una base sólida, pero todavía hay margen de mejora.'
  };
  return {
    label: 'Needs Study', class: 'low',
    description: 'Aún hay brechas importantes. Continúa practicando y reforzando los fundamentos.'
  };
}

function showFinalReport() {
  const total = state.activeQuestions.length;
  const mastered = Object.values(state.perQuestion).filter(r => r.state === Q_STATE.ANSWERED_CORRECT).length;
  const recovered = Object.values(state.perQuestion).filter(r => r.state === Q_STATE.RECOVERED_WITH_HINT).length;
  const unresolved = Object.values(state.perQuestion).filter(r => r.state === Q_STATE.UNRESOLVED).length;
  const isMixedExam = state.settings.domain === 'all';

  const awsLevel = total > 0 ? Math.round((mastered / total) * 100) : 0;
  const resolved = mastered + recovered;
  const readinessPct = total > 0 ? Math.round((resolved / total) * 100) : 0;
  const readinessLabel = isMixedExam ? t('examReadiness') : t('domainReadiness');
  const readinessTooltip = isMixedExam ? t('examReadinessTooltip') : t('domainReadinessTooltip');

  let successEstimate = null;
  if (isMixedExam) {
    let weighted = 0;
    Object.entries(DOMAIN_DEFS).forEach(([domain, def]) => {
      const domainQs = state.activeQuestions.filter(q => normalizeDomain(q.domain) === domain);
      const domainTotal = domainQs.length;
      if (domainTotal === 0) return;
      const domainResolved = domainQs.filter(q => {
        const r = state.perQuestion[q.id];
        return r && (r.state === Q_STATE.ANSWERED_CORRECT || r.state === Q_STATE.RECOVERED_WITH_HINT);
      }).length;
      weighted += (domainResolved / domainTotal) * 100 * (def.weight / 100);
    });
    const value = Math.round(weighted);
    successEstimate = { value, status: getSuccessEstimateStatus(value) };
  }

  const conceptMap = new Map();
  Object.values(state.perQuestion).forEach(r => {
    if (r.state === Q_STATE.RECOVERED_WITH_HINT || r.state === Q_STATE.UNRESOLVED) {
      const label = getCanonicalConcept(r);
      if (!conceptMap.has(label)) conceptMap.set(label, { domain: r.domain, count: 0 });
      conceptMap.get(label).count += 1;
    }
  });

  const needsReviewList = [...conceptMap.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .map(([label, data]) => `<li>${label}${data.count > 1 ? ` <span style="color:var(--text-mute);font-size:11px;">×${data.count}</span>` : ''}</li>`)
    .join('');

  const domainGrid = Object.entries(DOMAIN_DEFS).map(([domain, def]) => {
    const domainQs = state.activeQuestions.filter(q => normalizeDomain(q.domain) === domain);
    const domainTotal = domainQs.length;

    if (domainTotal === 0) {
      return `
        <li class="report-domain report-domain--not-evaluated">
          <div class="report-domain__row">
            <span class="report-domain__name">${domain}</span>
            <span class="report-domain__score report-domain__score--na">N/A</span>
          </div>
          <div class="report-domain__meta">
            <span>${t('notEvaluated')} · 0 preguntas</span>
            <span class="report-domain__weight">${def.weight}% ${t('resultByDomainWeight')}</span>
          </div>
        </li>
      `;
    }

    const domainResolved = domainQs.filter(q => {
      const r = state.perQuestion[q.id];
      return r && (r.state === Q_STATE.ANSWERED_CORRECT || r.state === Q_STATE.RECOVERED_WITH_HINT);
    }).length;
    const domainPct = Math.round((domainResolved / domainTotal) * 100);

    let cls = 'report-domain__score--low';
    if (domainPct >= 80) cls = 'report-domain__score--high';
    else if (domainPct >= 60) cls = 'report-domain__score--mid';

    return `
      <li class="report-domain">
        <div class="report-domain__row">
          <span class="report-domain__name">${domain}</span>
          <span class="report-domain__score ${cls}">${domainPct}%</span>
        </div>
        <div class="report-domain__meta">
          <span>${domainResolved} / ${domainTotal} ${t('resultByDomainCorrect')}</span>
          <span class="report-domain__weight">${def.weight}% ${t('resultByDomainWeight')}</span>
        </div>
      </li>
    `;
  }).join('');

  const quizCard = document.querySelector('.quiz-card');
  quizCard.innerHTML = `
    <div class="final-report">
      <div class="report-hero">
        <div class="report-hero__label">👑 ${t('awsLevelLabel')}</div>
        <div><span class="report-hero__value">${awsLevel}</span><span class="report-hero__denom">%</span></div>
        <div class="report-hero__subtitle">${t('awsLevelSub')}</div>
      </div>

      <div class="report-section">
        <div class="report-section__title">🎯 ${readinessLabel}</div>
        <div class="report-readiness-box">
          <div class="report-readiness-box__value-wrap">
            <span class="report-readiness-box__value">${readinessPct}</span>
            <span class="report-readiness-box__denom">%</span>
          </div>
          <p class="report-readiness-box__desc">${readinessTooltip}</p>
        </div>
      </div>

      ${successEstimate ? `
      <div class="report-section">
        <div class="report-section__title">🏆 ${t('successEstimateLabel')}</div>
        <div class="report-success-box report-success-box--${successEstimate.status.class}">
          <div class="report-success-box__value-wrap">
            <span class="report-success-box__value">${successEstimate.value}</span>
            <span class="report-success-box__denom">%</span>
          </div>
          <div class="report-success-box__status">${successEstimate.status.label}</div>
          <p class="report-success-box__desc">${successEstimate.status.description}</p>
        </div>
      </div>
      ` : ''}

      <div class="report-metrics">
        <div class="report-metric-card report-metric-card--highlight">
          <span class="report-metric-card__label">🟢 MASTERED</span>
          <span class="report-metric-card__value">${mastered}</span>
          <span class="report-metric-card__note">${t('masteredNote')}</span>
        </div>
        <div class="report-metric-card report-metric-card--highlight">
          <span class="report-metric-card__label">🟡 RECOVERED</span>
          <span class="report-metric-card__value">${recovered}</span>
          <span class="report-metric-card__note">${t('recoveredNote')}</span>
        </div>
        <div class="report-metric-card">
          <span class="report-metric-card__label">🔴 UNRESOLVED</span>
          <span class="report-metric-card__value">${unresolved}</span>
          <span class="report-metric-card__note">${t('unresolvedNote')}</span>
        </div>
        <div class="report-metric-card">
          <span class="report-metric-card__label">📚 NEEDS REVIEW</span>
          <span class="report-metric-card__value">${conceptMap.size}</span>
          <span class="report-metric-card__note">${t('needsReviewNote')}</span>
        </div>
      </div>

      ${isMixedExam ? `
      <div class="report-section">
        <div class="report-section__title">${t('resultByDomain')}</div>
        <ul class="report-domains">${domainGrid}</ul>
      </div>
      ` : ''}

      ${conceptMap.size > 0 ? `
      <div class="report-section">
        <div class="report-section__title">${t('needsStudy')}</div>
        <ul class="report-concepts">${needsReviewList}</ul>
      </div>
      ` : ''}

      <p class="final-disclaimer">${t('finalDisclaimer')}</p>

      <div class="final-actions">
        <button id="restartBtn" class="btn btn--primary">🔄 ${t('repeatSim')}</button>
        ${unresolved > 0 ? `<button id="retryFailedBtn" class="btn btn--secondary">🎯 ${t('retryFailed')} (${unresolved})</button>` : ''}
      </div>
    </div>
  `;

  document.getElementById('restartBtn')?.addEventListener('click', () => {
    clearState();
    state.currentView = 'practice';
    document.querySelector('.quiz-card').innerHTML = getPracticeTemplate();
    bindPracticeEvents();
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

  document.getElementById('retryFailedBtn')?.addEventListener('click', retryOnlyFailed);
}

// =============================================================
// RETRY ONLY FAILED
// =============================================================
function retryOnlyFailed() {
  const failedQuestions = state.activeQuestions.filter(q => {
    const r = state.perQuestion[q.id];
    return r && r.state === Q_STATE.UNRESOLVED;
  });

  if (failedQuestions.length === 0) {
    alert('No hay preguntas falladas para reintentar.');
    return;
  }

  // Resetear estados de las preguntas falladas
  state.activeQuestions = failedQuestions.map(q => ({ ...q }));
  state.sessionId = Date.now().toString();
  state.currentIndex = 0;
  state.awsLevel = 0;
  state.currentStreak = 0;
  state.bestStreak = 0;
  state.totalAttempts = 0;
  state.correctFirstAttempt = 0;
  state.correctAfterHint = 0;
  state.unresolved = 0;
  state.perQuestion = {};
  state.lastWeakConcept = 'default';
  state.timerExpired = false;

  state.activeQuestions.forEach(q => {
    state.perQuestion[q.id] = {
      id: q.id,
      domain: normalizeDomain(q.domain),
      concept: q.concept || 'Concepto sin especificar',
      service: q.service || '',
      explanation: q.explanation || '',
      state: Q_STATE.UNSEEN,
      attempts: 0,
      firstAttemptCorrect: false,
      usedHint: false,
      correctAfterHint: false,
      recovered: false,
      unresolved: false,
      hadError: false,
      history: []
    };
  });

  state.currentView = 'practice';
  const quizCard = document.querySelector('.quiz-card');
  quizCard.innerHTML = getPracticeTemplate();
  bindPracticeEvents();

  if (state.mode === 'exam') {
    const minutes = Math.max(5, Math.round(failedQuestions.length * 1.38));
    startExamTimer(minutes * 60, Date.now());
  } else {
    stopExamTimer();
  }

  saveState();
  renderAll();
  console.log(`🎯 Reintentando ${failedQuestions.length} preguntas falladas.`);
}

// =============================================================
// LEARNING HUB
// =============================================================
function showLearningHub() {
  state.currentView = 'learning';
  const quizCard = document.querySelector('.quiz-card');

  const errorCounts = {};
  Object.values(state.perQuestion).forEach(r => {
    if (r.state === Q_STATE.RECOVERED_WITH_HINT || r.state === Q_STATE.UNRESOLVED) {
      const label = getCanonicalConcept(r);
      if (!errorCounts[r.domain]) errorCounts[r.domain] = {};
      errorCounts[r.domain][label] = (errorCounts[r.domain][label] || 0) + 1;
    }
  });

  const errorSections = Object.entries(errorCounts).length > 0
    ? Object.entries(errorCounts).map(([domain, concepts]) => `
        <div style="margin-bottom: 12px;">
          <div style="font-size: 12px; font-weight: 800; color: var(--text); margin-bottom: 8px; text-transform: uppercase;">${domain}</div>
          <ul class="report-concepts">
            ${Object.entries(concepts).map(([concept, count]) => `<li>${concept} <span style="color: var(--text-mute); font-size: 11px;">· ${count} ${count === 1 ? 'vez' : 'veces'}</span></li>`).join('')}
          </ul>
        </div>
      `).join('')
    : `<p style="font-size: 13px; color: var(--text-mute); text-align: center; padding: 16px;">${t('noErrorsYet')}</p>`;

  quizCard.innerHTML = `
    <div class="final-report">
      <div class="report-hero" style="background: linear-gradient(160deg, #2563EB 0%, #1E40AF 100%);">
        <div class="report-hero__label" style="color: #BFDBFE;">LEARNING HUB</div>
        <div class="report-hero__subtitle" style="font-size: 13px; margin-top: 10px; color: #DBEAFE;">
          ${t('learningHubSub')}
        </div>
      </div>

      <div class="report-section">
        <div class="report-section__title">${t('topConcepts')}</div>
        ${errorSections}
      </div>

      <div class="report-section">
        <div class="report-section__title">${t('statsTitle')}</div>
        <ul class="report-list">
          <li class="report-list__item report-list__item--green">
            <strong>${t('statsTotal')}</strong>
            <span>${Object.values(state.perQuestion).filter(r => r.state !== Q_STATE.UNSEEN).length}</span>
          </li>
          <li class="report-list__item report-list__item--green">
            <strong>${t('statsMastered')}</strong>
            <span>${state.correctFirstAttempt}</span>
          </li>
          <li class="report-list__item report-list__item--amber">
            <strong>${t('statsRecovered')}</strong>
            <span>${state.correctAfterHint}</span>
          </li>
          <li class="report-list__item report-list__item--red">
            <strong>${t('statsUnresolved')}</strong>
            <span>${state.unresolved}</span>
          </li>
        </ul>
      </div>
    </div>
  `;
}

// =============================================================
// TICKER
// =============================================================
async function initTicker() {
  const track = document.getElementById('tickerTrack');
  const viewport = document.querySelector('.footer__ticker-viewport');
  if (!track || !viewport) return;

  let services = window.awsServices;
  if (!services || services.length === 0) {
    try {
      const res = await fetch('./aws-services.js');
      if (res.ok) {
        const text = await res.text();
        const startIdx = text.indexOf('[');
        const endIdx = text.lastIndexOf(']');
        if (startIdx !== -1 && endIdx !== -1) {
          services = eval(text.substring(startIdx, endIdx + 1));
          window.awsServices = services;
        }
      }
    } catch (e) { console.error('Error cargando aws-services.js:', e); }
  }

  if (!services || services.length === 0) return;

  const buildItem = (svc) => {
    const initials = (svc.shortName || svc.name || '?').toString().slice(0, 3).toUpperCase();
    return `
      <button type="button" class="ticker-item" data-service-id="${svc.id}" aria-label="${svc.name}">
        <span class="ticker-item__icon" data-icon="${svc.id}">
          <img src="./icons/${svc.id}.svg" alt="${svc.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=&quot;ticker-item__fallback&quot;>${initials}</span>';" />
        </span>
        <span class="ticker-item__name">${svc.shortName || svc.name}</span>
      </button>
    `;
  };

  const html = services.map(buildItem).join('');
  track.innerHTML = html + html;

  track.querySelectorAll('.ticker-item').forEach(item => {
    const svcId = item.dataset.serviceId;
    const svc = services.find(s => s.id === svcId);
    if (!svc) return;

    item.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
      showTickerTooltip(item, svc);
    });
    item.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
      hideTickerTooltip();
    });
    item.addEventListener('click', (e) => {
      e.preventDefault();
      hideTickerTooltip();
      openServiceModal(svc);
    });
  });

  viewport.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
  viewport.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
    hideTickerTooltip();
  });
}

// =============================================================
// TOOLTIP
// =============================================================
let tooltipEl = null;

function showTickerTooltip(anchor, svc) {
  hideTickerTooltip();
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'ticker-tooltip';

  const lang = state.lang || 'es';
  const desc = svc.description && svc.description[lang] ? svc.description[lang] : '';
  const catLabel = svc.categoryLabel && svc.categoryLabel[lang] ? svc.categoryLabel[lang] : svc.category;

  tooltipEl.innerHTML = `
    <div class="ticker-tooltip__header">
      <span class="ticker-tooltip__category ticker-tooltip__category--${svc.color || 'default'}">${catLabel}</span>
      <strong class="ticker-tooltip__name">${svc.name}</strong>
    </div>
    <p class="ticker-tooltip__desc">${desc}</p>
    <span class="ticker-tooltip__hint">${t('clickForMore')}</span>
  `;

  document.body.appendChild(tooltipEl);
  const rect = anchor.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();

  let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
  let top = rect.top - tooltipRect.height - 12;
  if (left < 12) left = 12;
  if (left + tooltipRect.width > window.innerWidth - 12) left = window.innerWidth - tooltipRect.width - 12;
  if (top < 12) top = rect.bottom + 12;

  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
  requestAnimationFrame(() => tooltipEl.classList.add('is-visible'));
}

function hideTickerTooltip() {
  if (tooltipEl) {
    tooltipEl.classList.remove('is-visible');
    const t = tooltipEl;
    setTimeout(() => t.remove(), 200);
    tooltipEl = null;
  }
}

// =============================================================
// SERVICE MODAL
// =============================================================
function openServiceModal(svc) {
  const lang = state.lang || 'es';
  const L = (key) => svc[key] && svc[key][lang] ? svc[key][lang] : (svc[key] ? svc[key].es : '');
  const Llist = (key) => {
    const arr = svc[key] && (svc[key][lang] || svc[key].es);
    if (!arr || !arr.length) return '';
    return `<ul>${arr.map(i => `<li>${i}</li>`).join('')}</ul>`;
  };

  const catLabel = svc.categoryLabel && svc.categoryLabel[lang] ? svc.categoryLabel[lang] : svc.category;
  const labels = lang === 'en' ? {
    whatIs: 'What is it?', problem: 'Problem it solves', how: 'How does it work?',
    features: 'Key features', useCases: 'Use cases', close: 'Close'
  } : {
    whatIs: '¿Qué es?', problem: '¿Qué problema resuelve?', how: '¿Cómo funciona?',
    features: 'Características', useCases: 'Casos de uso', close: 'Cerrar'
  };

  const modalHTML = `
    <div class="service-modal-overlay" id="serviceModalOverlay">
      <div class="service-modal" role="dialog" aria-modal="true">
        <button type="button" class="service-modal__close" id="serviceModalClose" aria-label="${labels.close}">
          <svg viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        <div class="service-modal__header">
          <div class="service-modal__icon">
            <img src="./icons/${svc.id}.svg" alt="${svc.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=&quot;service-modal__icon-fallback&quot;>${svc.shortName || svc.name}</span>';" />
          </div>
          <div>
            <span class="service-modal__category">${catLabel}</span>
            <h2 class="service-modal__title">${svc.name}</h2>
          </div>
        </div>
        <div class="service-modal__body">
          <div class="service-modal__section"><h3>${labels.whatIs}</h3><p>${L('description')}</p></div>
          <div class="service-modal__section"><h3>${labels.problem}</h3><p>${L('problemSolved')}</p></div>
          <div class="service-modal__section"><h3>${labels.how}</h3><p>${L('howItWorks')}</p></div>
          <div class="service-modal__grid">
            <div class="service-modal__section"><h3>${labels.features}</h3>${Llist('features')}</div>
            <div class="service-modal__section"><h3>${labels.useCases}</h3>${Llist('useCases')}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = modalHTML;
  document.body.appendChild(container.firstElementChild);
  document.body.style.overflow = 'hidden';

  const overlay = document.getElementById('serviceModalOverlay');
  const closeBtn = document.getElementById('serviceModalClose');
  const closeModal = () => {
    overlay.classList.remove('is-visible');
    setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 200);
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  const escHandler = (e) => {
    if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); }
  };
  document.addEventListener('keydown', escHandler);
  requestAnimationFrame(() => overlay.classList.add('is-visible'));
}

// =============================================================
// WELCOME MODAL
// =============================================================
function renderDomainHero(domain) {
  const meta = DOMAIN_META[domain] || DOMAIN_META['all'];
  const hero = document.getElementById('welcomeDomainHero');
  if (!hero) return;
  hero.dataset.domain = domain;

  const heroIcon = document.getElementById('welcomeDomainHeroIcon');
  const heroName = document.getElementById('welcomeDomainHeroName');
  const heroBadge = document.getElementById('welcomeDomainHeroBadge');
  const heroDesc = document.getElementById('welcomeDomainHeroDesc');
  const heroDetail = document.getElementById('welcomeDomainHeroDetail');

  if (heroIcon) { heroIcon.innerHTML = DOMAIN_SVG_ICONS[meta.icon] || DOMAIN_SVG_ICONS.target; }
  if (heroName) heroName.textContent = meta.name;
  if (heroBadge) heroBadge.classList.toggle('hidden', !meta.isRecommended);
  if (heroDesc) heroDesc.textContent = meta.desc;

  if (heroDetail) {
    if (domain === 'all') {
      heroDetail.innerHTML = renderDistributionDetail();
    } else {
      heroDetail.innerHTML = renderSingleDomainDetail(meta);
    }
  }
}

function renderDistributionDetail() {
  return `
    <div class="welcome-domain-hero__dist">
      <div class="welcome-domain-hero__dist-title">Se utilizarán los pesos oficiales del examen:</div>
      <div class="welcome-domain-hero__dist-grid">
        <div class="welcome-domain-hero__dist-item"><span class="welcome-domain-hero__dist-dot welcome-domain-hero__dist-dot--blue"></span><span class="welcome-domain-hero__dist-name">Cloud Concepts</span><span class="welcome-domain-hero__dist-pct">24%</span></div>
        <div class="welcome-domain-hero__dist-item"><span class="welcome-domain-hero__dist-dot welcome-domain-hero__dist-dot--green"></span><span class="welcome-domain-hero__dist-name">Security &amp; Compliance</span><span class="welcome-domain-hero__dist-pct">30%</span></div>
        <div class="welcome-domain-hero__dist-item"><span class="welcome-domain-hero__dist-dot welcome-domain-hero__dist-dot--amber"></span><span class="welcome-domain-hero__dist-name">Technology &amp; Services</span><span class="welcome-domain-hero__dist-pct">34%</span></div>
        <div class="welcome-domain-hero__dist-item"><span class="welcome-domain-hero__dist-dot welcome-domain-hero__dist-dot--purple"></span><span class="welcome-domain-hero__dist-name">Billing, Pricing &amp; Support</span><span class="welcome-domain-hero__dist-pct">12%</span></div>
      </div>
    </div>
  `;
}

function renderSingleDomainDetail(meta) {
  return `
    <div class="welcome-domain-hero__single">
      <div class="welcome-domain-hero__single-text">
        Tu sesión se enfocará <strong>exclusivamente</strong> en este dominio.
        El 100% de las preguntas pertenecerán a <strong>${meta.name}</strong>.
      </div>
      <div class="welcome-domain-hero__single-highlight">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>
        <span>Este dominio representa ~<strong>${meta.weight}%</strong> del examen AWS CLF-C02</span>
      </div>
    </div>
  `;
}

function renderPreviewForDomain(domain, count) {
  const container = document.getElementById('welcomePreviewDistribution');
  if (!container) return;
  const totalCount = count || 100;

  if (domain === 'all') {
    container.innerHTML = `
      <div class="welcome-preview__dist-title"><span>${totalCount}</span> preguntas</div>
      <div class="welcome-preview__bar-list">
        <div class="welcome-preview__bar-item">
          <span class="welcome-preview__bar-dot welcome-preview__bar-dot--blue"></span>
          <span class="welcome-preview__bar-name">Cloud Concepts</span>
          <div class="welcome-preview__bar-track"><div class="welcome-preview__bar-fill welcome-preview__bar-fill--blue" style="width: 82%"></div></div>
          <span class="welcome-preview__bar-value">${Math.round(totalCount * 0.24)}</span>
        </div>
        <div class="welcome-preview__bar-item">
          <span class="welcome-preview__bar-dot welcome-preview__bar-dot--green"></span>
          <span class="welcome-preview__bar-name">Security &amp; Compliance</span>
          <div class="welcome-preview__bar-track"><div class="welcome-preview__bar-fill welcome-preview__bar-fill--green" style="width: 84%"></div></div>
          <span class="welcome-preview__bar-value">${Math.round(totalCount * 0.30)}</span>
        </div>
        <div class="welcome-preview__bar-item">
          <span class="welcome-preview__bar-dot welcome-preview__bar-dot--amber"></span>
          <span class="welcome-preview__bar-name">Technology &amp; Services</span>
          <div class="welcome-preview__bar-track"><div class="welcome-preview__bar-fill welcome-preview__bar-fill--amber" style="width: 88%"></div></div>
          <span class="welcome-preview__bar-value">${Math.round(totalCount * 0.34)}</span>
        </div>
        <div class="welcome-preview__bar-item">
          <span class="welcome-preview__bar-dot welcome-preview__bar-dot--purple"></span>
          <span class="welcome-preview__bar-name">Billing, Pricing &amp; Support</span>
          <div class="welcome-preview__bar-track"><div class="welcome-preview__bar-fill welcome-preview__bar-fill--purple" style="width: 76%"></div></div>
          <span class="welcome-preview__bar-value">${Math.round(totalCount * 0.12)}</span>
        </div>
      </div>
    `;
    return;
  }

  const meta = DOMAIN_META[domain];
  if (!meta) return;
  const colorMap = { blue: 'blue', green: 'green', amber: 'amber', purple: 'purple' };
  const color = colorMap[meta.color] || 'blue';

  container.innerHTML = `
    <div class="welcome-preview__dist-title"><span>${totalCount}</span> preguntas</div>
    <div class="welcome-preview__single">
      <div class="welcome-preview__single-header">
        <div class="welcome-preview__single-icon welcome-domain__icon--${color}">
          ${DOMAIN_SVG_ICONS[meta.icon] || DOMAIN_SVG_ICONS.cloud}
        </div>
        <div class="welcome-preview__single-info">
          <div class="welcome-preview__single-name">${meta.name}</div>
          <div class="welcome-preview__single-sub">Sesión enfocada · 100% del dominio</div>
        </div>
      </div>
      <div class="welcome-preview__single-bar">
        <div class="welcome-preview__single-track"><div class="welcome-preview__single-fill welcome-preview__bar-fill--${color}" style="width: 100%"></div></div>
        <span class="welcome-preview__single-pct">100%</span>
      </div>
    </div>
  `;
}

function updateDomainToggleLabel(domain) {
  const toggleLabel = document.getElementById('welcomeDomainToggleLabel');
  const toggleAction = document.getElementById('welcomeDomainToggleAction');
  if (!toggleLabel || !toggleAction) return;
  if (domain === 'all') {
    toggleLabel.textContent = '¿Quieres enfocarte en un solo dominio?';
    toggleAction.textContent = 'Seleccionar dominio específico';
  } else {
    toggleLabel.textContent = '¿Quieres cambiar de dominio?';
    toggleAction.textContent = 'Ver opciones';
  }
}

function updateWelcomeCTA() {
  const startBtn = document.getElementById('welcomeStartBtn');
  const startLabel = document.getElementById('welcomeStartLabel');
  if (!startBtn || !startLabel) return;
  const anySelected = document.querySelector('#welcomeQuestionCount .welcome-option.is-selected');
  if (anySelected) {
    startBtn.disabled = false;
    startBtn.classList.remove('is-disabled');
    startLabel.textContent = t('welcomeCta');
  }
}

// =============================================================
// WELCOME MODAL — Setup
// =============================================================
function setupWelcomeModal() {
  const overlay = document.getElementById('welcomeOverlay');
  const startBtn = document.getElementById('welcomeStartBtn');
  const startLabel = document.getElementById('welcomeStartLabel');
  const countOptions = document.querySelectorAll('#welcomeQuestionCount .welcome-option');
  const modeButtons = document.querySelectorAll('#welcomeMode .welcome-mode__btn');
  const domainToggle = document.getElementById('welcomeDomainToggle');
  const domainList = document.getElementById('welcomeDomainList');
  const domainButtons = document.querySelectorAll('#welcomeDomainList .welcome-domain');

  if (!overlay || !startBtn) return;

  let selectedCount = 100;
  let selectedDomain = 'all';
  let selectedMode = 'practice';

  function updateCTA() {
    if (selectedCount !== null) {
      startBtn.disabled = false;
      startBtn.classList.remove('is-disabled');
      startLabel.textContent = t('welcomeCta');
    }
  }

  countOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      countOptions.forEach(o => o.classList.remove('is-selected'));
      opt.classList.add('is-selected');
      selectedCount = parseInt(opt.dataset.count, 10) || null;
      updateCTA();
      renderPreviewForDomain(selectedDomain, selectedCount);
    });
  });

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedMode = btn.dataset.mode || 'practice';
    });
  });

  function selectDomain(domain) {
    selectedDomain = domain;
    domainButtons.forEach(b => b.classList.toggle('is-selected', b.dataset.domain === domain));
    renderDomainHero(domain);
    updateDomainToggleLabel(domain);
    renderPreviewForDomain(domain, selectedCount);
  }

  domainToggle?.addEventListener('click', () => {
    const expanded = domainToggle.getAttribute('aria-expanded') === 'true';
    domainToggle.setAttribute('aria-expanded', String(!expanded));
    domainList?.classList.toggle('hidden', expanded);
  });

  domainButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectDomain(btn.dataset.domain || 'all');
      domainToggle?.setAttribute('aria-expanded', 'false');
      domainList?.classList.add('hidden');
    });
  });

  startBtn.addEventListener('click', () => {
    if (selectedCount === null) return;
    state.settings.questionCount = selectedCount;
    state.settings.domain = selectedDomain;
    state.mode = selectedMode;

    const settingsCountSelect = document.getElementById('settingQuestionCount');
    if (settingsCountSelect) settingsCountSelect.value = String(selectedCount);
    const settingsDomainSelect = document.getElementById('settingDomain');
    if (settingsDomainSelect) settingsDomainSelect.value = selectedDomain;

    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    startNewSession();
  });

  function resetWelcomeModal() {
    selectedCount = 100;
    selectedDomain = 'all';
    selectedMode = 'practice';

    countOptions.forEach(o => o.classList.remove('is-selected'));
    const defaultCount = document.querySelector('#welcomeQuestionCount .welcome-option[data-count="100"]');
    if (defaultCount) defaultCount.classList.add('is-selected');

    modeButtons.forEach(b => b.classList.toggle('is-selected', b.dataset.mode === 'practice'));

    domainButtons.forEach(b => b.classList.toggle('is-selected', b.dataset.domain === 'all'));

    domainList?.classList.add('hidden');
    domainToggle?.setAttribute('aria-expanded', 'false');

    renderDomainHero('all');
    updateDomainToggleLabel('all');
    renderPreviewForDomain('all', 100);
    updateCTA();
  }

  window.resetWelcomeModal = resetWelcomeModal;
  resetWelcomeModal();
  document.body.style.overflow = 'hidden';
}

// =============================================================
// NAVIGATION
// =============================================================
function setupNavigation() {
  const navItems = document.querySelectorAll('.topnav__item[data-view]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const view = item.dataset.view;
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const quizCard = document.querySelector('.quiz-card');

      switch (view) {
        case 'practice':
          state.currentView = 'practice';
          quizCard.innerHTML = getPracticeTemplate();
          bindPracticeEvents();
          renderAll();
          break;
        case 'learning':
          showLearningHub();
          break;
        case 'final':
          state.currentView = 'final';
          showFinalReport();
          break;
      }
    });
  });
}

function getPracticeTemplate() {
  return `
    <div class="quiz-meta">
      <div class="quiz-meta__left">
        <span class="quiz-meta__counter" id="questionCounter">Cargando...</span>
        <div class="progress progress--sm">
          <div class="progress__bar progress__bar--blue" id="questionProgressBar" style="width: 0%"></div>
        </div>
        <span class="quiz-meta__percent" id="questionPercent">0%</span>
      </div>
      <div class="quiz-meta__right">
        <span class="badge badge--green" id="domainBadge">Cargando...</span>
        <span class="badge badge--gray" id="examWeightBadge">--%</span>
      </div>
    </div>
    <h1 class="quiz-question" id="questionText">Cargando pregunta...</h1>
    <div class="quiz-options" id="optionsContainer"></div>
    <div class="quiz-actions">
      <button class="btn btn--primary" id="submitBtn" disabled>
        <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
        <span>${t('submitBtn')}</span>
      </button>
      <button class="btn btn--hint" id="hintBtn" disabled>
        <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M8 14.5A5.5 5.5 0 1 1 16 14.5c-.8.9-1.5 1.6-1.5 2.5h-5c0-.9-.7-1.6-1.5-2.5Z"/></svg>
        <span id="hintBtnLabel">${t('hintBtn')}</span>
      </button>
      <button class="btn btn--next" id="nextBtn" disabled>
        <span>${t('nextBtn')}</span>
        <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13.5M13 6.5 18.5 12 13 17.5"/></svg>
      </button>
    </div>
    <div id="feedbackArea" class="feedback hidden"></div>
  `;
}

function bindPracticeEvents() {
  document.getElementById('submitBtn')?.addEventListener('click', submitAnswer);
  document.getElementById('hintBtn')?.addEventListener('click', useHint);
  document.getElementById('nextBtn')?.addEventListener('click', nextQuestion);
}

// =============================================================
// INIT
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  applyStaticTranslations();
  initTicker();
  setupNavigation();
  setupWelcomeModal();

  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
  document.getElementById('langSwitchBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector('.lang-switch').classList.toggle('is-open');
  });
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      setLang(opt.dataset.lang);
      document.querySelector('.lang-switch').classList.remove('is-open');
    });
  });
  document.addEventListener('click', (e) => {
    const sw = document.querySelector('.lang-switch');
    if (sw && !sw.contains(e.target)) sw.classList.remove('is-open');
  });

  // Session Found modal
  document.getElementById('sessionContinueBtn')?.addEventListener('click', () => {
    document.getElementById('sessionFoundOverlay').classList.add('hidden');
    document.body.style.overflow = '';
    restoreSession();
  });
  document.getElementById('sessionNewBtn')?.addEventListener('click', () => {
    document.getElementById('sessionFoundOverlay').classList.add('hidden');
    clearState();
    pendingSession = null;
    window.__pendingSession = null;
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

  // Confirm New Simulator modal
  document.getElementById('cancelNewSimBtn')?.addEventListener('click', () => {
    document.getElementById('confirmNewSimOverlay').classList.add('hidden');
  });
  document.getElementById('confirmNewSimBtn')?.addEventListener('click', () => {
    document.getElementById('confirmNewSimOverlay').classList.add('hidden');
    clearState();
    state.currentView = 'practice';
    document.querySelector('.quiz-card').innerHTML = getPracticeTemplate();
    bindPracticeEvents();
    stopExamTimer();
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

  // Unresolved modal
  document.getElementById('unresolvedUnderstoodBtn')?.addEventListener('click', hideUnresolvedModal);

  // Time Expired modal
  document.getElementById('viewResultsBtn')?.addEventListener('click', () => {
    document.getElementById('timeExpiredOverlay').classList.add('hidden');
    state.currentView = 'final';
    stopExamTimer();
    showFinalReport();
  });

  // New Simulator button (con confirmación si hay progreso)
  document.getElementById('newSimulatorBtn')?.addEventListener('click', () => {
    const totalAnswered = Object.values(state.perQuestion).filter(r => r.state !== Q_STATE.UNSEEN).length;
    if (totalAnswered > 0 && state.currentView === 'practice') {
      document.getElementById('confirmNewSimOverlay').classList.remove('hidden');
    } else {
      const overlay = document.getElementById('welcomeOverlay');
      if (overlay) {
        if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  // Settings panel
  document.getElementById('settingsBtn')?.addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.remove('hidden');
  });
  document.getElementById('closeSettingsBtn')?.addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.add('hidden');
  });
  document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
    state.settings.questionCount = parseInt(document.getElementById('settingQuestionCount').value) || 100;
    state.settings.domain = document.getElementById('settingDomain').value || 'all';
    state.settings.showHints = document.getElementById('settingHints').checked;
    state.settings.secondHint = document.getElementById('settingSecondHint').checked;
    state.settings.immediateExplanation = document.getElementById('settingExplanation').checked;
    state.settings.animations = document.getElementById('settingAnimations').checked;
    saveState();
    document.getElementById('settingsPanel').classList.add('hidden');
    clearState();
    state.currentView = 'practice';
    document.querySelector('.quiz-card').innerHTML = getPracticeTemplate();
    bindPracticeEvents();
    startNewSession();
  });

  loadQuestions();

  const overlay = document.getElementById('welcomeOverlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  setTimeout(() => {
    bindPracticeEvents();
    console.log('✓ Eventos bindeados');
  }, 100);
});

// =============================================================
// ANIMACIONES CSS
// =============================================================
const streakStyle = document.createElement("style");
streakStyle.textContent = `
  @keyframes streakPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); box-shadow: 0 0 12px rgba(255,153,0,0.6); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(streakStyle);

// =============================================================
// EXPONER AL SCOPE GLOBAL
// =============================================================
window.initTicker = initTicker;
window.showTickerTooltip = showTickerTooltip;
window.hideTickerTooltip = hideTickerTooltip;
window.openServiceModal = openServiceModal;
window.toggleReviewGroup = toggleReviewGroup;
window.restoreSession = restoreSession;
window.getCanonicalConcept = getCanonicalConcept;

window.__debug = {
  showModal: () => document.getElementById('welcomeOverlay')?.classList.remove('hidden'),
  hideModal: () => document.getElementById('welcomeOverlay')?.classList.add('hidden'),
  clearStorage: () => { localStorage.clear(); console.log('🗑️ localStorage limpiado.'); },
  state: () => state,
  pendingSession: () => window.__pendingSession,
  distributions: () => MIXED_DISTRIBUTIONS,
  tips: () => EXAM_TIPS,
  concepts: () => CONCEPT_DETAILS
};

// =============================================================
// v12.0 ADDITIONS — Splash + About Modal
// Pegado al final del motor v11.0
// =============================================================

// -------------------------------------------------------------
// SPLASH SCREEN
// -------------------------------------------------------------
function initSplash() {
  const splash = document.getElementById('splashOverlay');
  if (!splash) {
    console.warn('⚠️ splashOverlay no encontrado');
    return;
  }

  if (sessionStorage.getItem('splashShown') === 'true') {
    console.log('↷ Splash ya mostrado en esta sesión');
    splash.classList.add('hidden');
    return;
  }
  sessionStorage.setItem('splashShown', 'true');

  console.log('🎬 initSplash() — mostrando splash 3s');

  const SPLASH_DURATION = 3000;

  const hideSplash = () => {
    console.log('🎬 hideSplash()');
    splash.classList.add('is-fading');
    setTimeout(() => {
      splash.classList.add('hidden');
      document.body.style.overflow = '';
      console.log('✓ Splash oculto');
    }, 500);
  };

  const autoHideTimer = setTimeout(hideSplash, SPLASH_DURATION);

  splash.addEventListener('click', () => {
    clearTimeout(autoHideTimer);
    hideSplash();
  }, { once: true });

  document.body.style.overflow = 'hidden';
}

// -------------------------------------------------------------
// ABOUT MODAL
// -------------------------------------------------------------
function setupAboutModal() {
  const openAbout = () => {
    document.getElementById('aboutOverlay')?.classList.remove('hidden');
  };
  const closeAbout = () => {
    document.getElementById('aboutOverlay')?.classList.add('hidden');
  };

  document.getElementById('aboutBtn')?.addEventListener('click', openAbout);
  document.getElementById('footerAboutLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAbout();
  });
  document.getElementById('aboutCloseBtn')?.addEventListener('click', closeAbout);
  document.getElementById('aboutCloseBtn2')?.addEventListener('click', closeAbout);
  document.getElementById('aboutOverlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('aboutOverlay')) closeAbout();
  });
}

// -------------------------------------------------------------
// ARRANQUE v12.0 — Splash + About
// -------------------------------------------------------------
// El DOMContentLoaded del v11.0 ya arrancó el motor.
// Este bloque corre después y añade el splash + about.
// -------------------------------------------------------------

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initV12Additions);
} else {
  // El DOM ya está listo (script al final del body)
  initV12Additions();
}

function initV12Additions() {
  console.log('🚀 initV12Additions() — añadiendo splash + about');

  // 1. Splash primero
  try {
    initSplash();
  } catch (e) {
    console.error('❌ initSplash:', e);
    document.getElementById('splashOverlay')?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // 2. Fallback de emergencia — cierre forzado a los 5s
  setTimeout(() => {
    const s = document.getElementById('splashOverlay');
    if (s && !s.classList.contains('hidden')) {
      console.warn('⚠️ Cierre de emergencia del splash.');
      s.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 5000);

  // 3. About modal listeners
  try {
    setupAboutModal();
  } catch (e) {
    console.error('❌ setupAboutModal:', e);
  }

  // 4. Coordinar splash vs welcome modal
  //    El v11.0 muestra el welcomeOverlay inmediatamente en su DOMContentLoaded.
  //    Si el splash va a mostrarse, ocultamos welcome y lo re-mostramos cuando
  //    el splash termine.
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const splash = document.getElementById('splashOverlay');

  if (welcomeOverlay && splash && !splash.classList.contains('hidden')) {
    // Splash visible → ocultar welcome temporalmente
    welcomeOverlay.classList.add('hidden');

    // Re-mostrar welcome cuando el splash termine (3s + 0.5s fade = 3.5s)
    setTimeout(() => {
      if (splash.classList.contains('hidden')) {
        welcomeOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        console.log('✓ Welcome modal mostrado después del splash');
      }
    }, 3600);
  } else if (welcomeOverlay && splash && splash.classList.contains('hidden')) {
    // Splash ya no está (ya se mostró antes en esta sesión)
    // El v11.0 ya mostró welcome, no hacemos nada
    console.log('↷ Splash omitido (ya mostrado), welcome ya visible');
  }

  console.log('✓ v12.0 additions cargadas');
}