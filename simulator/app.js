/* =============================================================
   CARLOS LEARNING FRAMEWORK — AWS CLF-C02 SIMULATOR
   Motor completo v15.0 — Learning Cycle + Estado Simplificado
   v15.1 — Transparencia de métricas (tooltips + FAQ + tabla)
   ============================================================= */

const STORAGE_KEY = 'clf_c02_simulator_state_v6';
const THEME_KEY   = 'clf_c02_theme';
const LANG_KEY    = 'clf_c02_lang';
const SESSION_BACKUP_KEY = 'clf_c02_session_backup_v1';
const LEARNING_CYCLE_KEY = 'clf_c02_learning_cycle_v1';

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

const MIXED_DISTRIBUTIONS = {
  10:  { 'Cloud Concepts': 2, 'Security & Compliance': 3, 'Technology & Services': 4, 'Billing, Pricing & Support': 1 },
  25:  { 'Cloud Concepts': 6, 'Security & Compliance': 7, 'Technology & Services': 9, 'Billing, Pricing & Support': 3 },
  50:  { 'Cloud Concepts': 12, 'Security & Compliance': 15, 'Technology & Services': 17, 'Billing, Pricing & Support': 6 },
  100: { 'Cloud Concepts': 24, 'Security & Compliance': 30, 'Technology & Services': 34, 'Billing, Pricing & Support': 12 }
};

const EXAM_TIME_MINUTES = {
  10: 15,
  25: 30,
  50: 60,
  100: 120
};

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

// ═══════════════════════════════════════════════════════════════
// TRANSLATIONS — v15.1 con transparencia de métricas
// ═══════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  es: {
    navPractice: 'Practice Mode',
    navLearning: 'Learning Hub',
    navFinal: 'Final Report',
    navAbout: 'Acerca de',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    needsReview: 'NECESITA REPASO',
    needsReviewSub: 'Conceptos que requieren tu atención.',
    reviewEmpty: '✓ No hay conceptos pendientes de repaso',
    studyTip: 'Consejo de estudio',
    studyTipDefault: 'Enfócate en los conceptos donde tienes más errores.',
    hintBtn: 'Ver pista',
    hintUsed: 'Pista usada',
    hintExhausted: 'Sin más pistas',
    loading: 'Cargando...',
    submitBtn: 'Enviar respuesta',
    hintBtn1: 'Ver pista 1',
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
    recoveredNote: 'con o sin pista',
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
    recoveredNoHintTitle: '✓ Recuperada (sin pista)',
    incorrectTitle: '✗ Incorrecto',
    incorrectBody: 'Tienes una pista disponible. Después podrás intentarlo una vez más.',
    unresolvedTitle: '✕ No resuelta',
    unresolvedBody: (n) => `La respuesta correcta era ${n}.`,
    questionCounter: (n, total) => `Pregunta ${n} de ${total}`,
    awsLevelLabel: 'AWS LEVEL',
    awsLevelSub: 'Dominio sin ayuda · primer intento',
    awsLevelTooltip: 'Preguntas correctas al primer intento, sin pistas. La métrica más estricta del simulador.',
    examReadiness: 'EXAM READINESS',
    domainReadiness: 'DOMAIN READINESS',
    examReadinessTooltip: 'Estimación de preparación basada en preguntas dominadas y recuperadas durante la sesión. No es garantía de aprobar el examen.',
    domainReadinessTooltip: 'Estimación de preparación para este dominio específico.',
    successEstimateLabel: 'CLF-C02 EXAM SUCCESS ESTIMATE',
    successEstimateTooltip: 'Estimación de alineación con los dominios oficiales del examen CLF-C02. No es una predicción de aprobación.',
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
    statsRecovered: 'Recuperadas',
    statsUnresolved: 'Sin resolver',
    learningHubSub: 'Explora los servicios de AWS y refuerza tus conocimientos',
    clickForMore: 'Click para más info →',
    welcomeCta: 'Comenzar simulación',
    welcomeCtaDisabled: 'Elige la cantidad de preguntas',
    notEvaluated: 'No evaluado',
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
    timeExpiredPendingNote: 'Estas se contaron como no resueltas',
    timeExpiredHint: 'Elige cómo continuar:',
    timeExpiredViewResults: 'Ver resultados',
    timeExpiredRetrySame: 'Reintentar',
    timeExpiredNewSim: 'Nuevo simulador',
    welcomeBadge: 'AWS CLF-C02',
    welcomeBy: 'ValenciaF. Carlos DevOps',
    welcomeTitle: 'Practice Simulator',
    welcomeSubtitle: 'Prepárate para el examen AWS Certified Cloud Practitioner con un sampleo real basado en los pesos oficiales del examen.',
    welcomeFeature1Title: '1,200 preguntas',
    welcomeFeature1Desc: 'originales y únicas',
    welcomeFeature2Title: 'Sampleo con',
    welcomeFeature2Desc: 'pesos oficiales (24/30/34/12)',
    welcomeFeature3Title: 'Pistas progresivas',
    welcomeFeature3Desc: '+ Concept Insight',
    welcomeFeature4Title: 'AWS Level',
    welcomeFeature4Desc: '+ Final Report + tracking',
    welcomeStep1Title: 'Configura tu sesión',
    welcomeStep1Subtitle: 'Elige cantidad de preguntas y modo de práctica.',
    welcomeOptionQuestions: 'PREGUNTAS',
    welcomeOptionExamReal: 'EXAMEN REAL',
    welcomeRecommended: 'RECOMENDADO',
    welcomeModeTitle: 'Modo de práctica',
    welcomeModePracticeName: 'Practice Mode',
    welcomeModePracticeDesc: 'Sin límite de tiempo · Aprende con pistas',
    welcomeModeExamName: 'Exam Mode',
    welcomeModeExamDesc: 'Con límite de tiempo · Simula el examen real',
    welcomeStep2Title: 'Selecciona el dominio de práctica',
    welcomeStep2Subtitle: 'Por defecto practicarás con todos los dominios.',
    welcomeDomainHeroName: 'Mixed Exam',
    welcomeDomainHeroDesc: 'Todos los dominios · Distribución oficial CLF-C02',
    welcomeDomainDistTitle: 'Se utilizarán los pesos oficiales del examen:',
    welcomeDomainPctExam: 'del examen',
    welcomeDomainToggleLabel: '¿Quieres enfocarte en un solo dominio?',
    welcomeDomainToggleAction: 'Seleccionar dominio específico',
    welcomeDomainMixedName: 'Mixed Exam',
    welcomeDomainMixedDesc: 'Todos los dominios · Distribución oficial',
    welcomeStep3Title: 'Vista previa de resultados',
    welcomeStep3Subtitle: 'Al finalizar verás un resumen similar a este.',
    welcomePreviewTimeLabel: 'TIEMPO ESTIMADO',
    welcomePreviewTimeValue: '40 – 60 min',
    welcomeAwsLevelTitle: 'AWS LEVEL',
    welcomeAwsLevelExample: 'EJEMPLO',
    welcomeAwsLevelCurrent: 'Nivel actual',
    welcomeAwsLevelTarget: 'Nivel potencial',
    welcomeAwsLevelStrong: 'Dominio más fuerte',
    welcomeAwsLevelWeak: 'Dominio más débil',
    welcomeAwsLevelMessage: 'Tu resultado final se mostrará aquí al finalizar la simulación.',
    welcomeBenefitsTitle: 'Beneficios de esta sesión',
    welcomeBenefit1: 'Actualiza tu AWS Level',
    welcomeBenefit2: 'Identifica áreas de mejora',
    welcomeBenefit3: 'Se refleja en tu Final Report',
    welcomeBenefit4: 'Pistas progresivas',
    welcomeBenefit5: 'Seguimiento por dominio',
    welcomeCtaStart: 'Comenzar simulación',
    welcomeFooterLine1: 'Proyecto educativo independiente · No afiliado a Amazon Web Services',
    welcomeFooterLine2: 'AWS CLF-C02 by ValenciaF. Carlos DevOps',
    startLearningCycle: 'Reintentar fallados',
    startLearningCycleTooltip: 'Practica los conceptos que fallaste con nuevas preguntas, para demostrar comprensión real y no memoria.',
    retryReportTitle: 'Retry Report',
    retryReportSub: 'Recuperación de conceptos débiles',
    retryReportAttempt: 'Intento',
    retryReportConceptsTested: 'Conceptos evaluados',
    retryReportConceptsRecovered: 'Conceptos recuperados',
    retryReportConceptsRemaining: 'Conceptos pendientes',
    retryReportRecoveryRate: 'Tasa de recuperación',
    retryReportContinue: 'Reintentar pendientes',
    retryReportEndCycle: 'Terminar ciclo',
    retryReportNoMoreQuestions: 'No hay más preguntas disponibles para los conceptos pendientes.',
    masteryReportTitle: 'Mastery Achieved',
    masteryReportSub: 'Has recuperado todos los conceptos débiles',
    masteryReportCycleSummary: 'Resumen del Learning Cycle',
    masteryReportSession: 'Sesión',
    masteryReportWeakInitial: 'Conceptos débiles iniciales',
    masteryReportTotalTime: 'Duración total',
    masteryReportConceptsRemediated: 'Conceptos remediados',
    masteryReportNewCycle: 'Iniciar nuevo ciclo',
    masteryReportClose: 'Volver al inicio',
    masteryAllRemediated: '✓ Todos los conceptos débiles fueron remediados.',
    masteryConceptsRecoveredNote: (n, total) => `${n} de ${total} ${n === 1 ? 'concepto recuperado' : 'conceptos recuperados'} exitosamente.`,
    masteryUnlockedBadge: 'MASTERY UNLOCKED',
    masteryConceptsRemediated: (n) => `${n} / ${n}`,
    learningCycleNoQuestions: 'No hay más preguntas disponibles para este concepto.',
    learningCycleNoNewQuestions: 'No hay preguntas nuevas disponibles para los conceptos débiles. El ciclo no puede continuar.',
    learningCycleCancel: 'Cancelar ciclo',
    learningCycleInProgress: 'Learning Cycle en curso',
    learningCycleAttempt: (n) => `Intento ${n}`,
    learningCycleInitial: 'Sesión inicial',
    learningCycleCompleted: 'Completado',

    // ═══════════════════════════════════════════════════════════
    // v15.1 — TRANSPARENCIA DE MÉTRICAS
    // ═══════════════════════════════════════════════════════════
    metricsExplainTitle: '¿Cómo se calculan mis métricas?',
    metricsExplainSubtitle: 'Entiende qué mide cada número y por qué pueden mostrar valores distintos.',
    metricsShowDetails: 'Ver detalles',
    metricsHideDetails: 'Ocultar detalles',
    metricsComparisonTitle: 'Comparativa rápida',
    metricsComparisonCol1: 'Métrica',
    metricsComparisonCol2: 'Qué mide',
    metricsComparisonCol3: 'Incluye recuperadas',
    metricsComparisonCol4: 'Incluye pistas',
    metricsComparisonCol5: 'Ponderada',
    metricsComparisonYes: 'Sí',
    metricsComparisonNo: 'No',
    metricsComparisonDash: '—',
    metricsFaqTitle: 'Preguntas frecuentes',
    metricsFaq1Q: '¿Por qué mi AWS Level es menor que mi Exam Readiness?',
    metricsFaq1A: 'Porque AWS Level solo cuenta aciertos al primer intento sin pistas, mientras que Exam Readiness también incluye las preguntas que recuperaste después de un error.',
    metricsFaq2Q: '¿Por qué mi Success Estimate no coincide con mi Exam Readiness?',
    metricsFaq2A: 'Porque Success Estimate pondera cada dominio según su peso oficial en el examen (24/30/34/12), mientras que Exam Readiness es un promedio simple.',
    metricsFaq3Q: '¿Por qué mi AWS Level bajó si recuperé preguntas?',
    metricsFaq3A: 'Porque recuperar con pista no cuenta como dominio sin ayuda. AWS Level mide lo que dominas sin apoyo.',
    metricsFaq4Q: '¿Needs Review cuenta preguntas o conceptos?',
    metricsFaq4A: 'Conceptos. Si fallaste tres preguntas del mismo concepto, se cuenta como un solo concepto con contador ×3.',
    metricsAwsLevelName: 'AWS Level',
    metricsAwsLevelWhat: 'Dominio sin ayuda',
    metricsExamReadinessName: 'Exam Readiness',
    metricsExamReadinessWhat: 'Preparación con aprendizaje',
    metricsSuccessEstimateName: 'Success Estimate',
    metricsSuccessEstimateWhat: 'Alineación con dominios oficiales',
    metricsMasteredName: 'Mastered',
    metricsMasteredWhat: 'Correctas al primer intento',
    metricsRecoveredName: 'Recovered',
    metricsRecoveredWhat: 'Corregidas después de error',
    metricsUnresolvedName: 'Unresolved',
    metricsUnresolvedWhat: 'No resueltas',
    metricsNeedsReviewName: 'Needs Review',
    metricsNeedsReviewWhat: 'Conceptos a estudiar'
  },
  en: {
    navPractice: 'Practice Mode',
    navLearning: 'Learning Hub',
    navFinal: 'Final Report',
    navAbout: 'About',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    needsReview: 'NEEDS REVIEW',
    needsReviewSub: 'Concepts that require your attention.',
    reviewEmpty: '✓ No concepts pending review',
    studyTip: 'Study tip',
    studyTipDefault: 'Focus on the concepts where you have the most errors.',
    hintBtn: 'Show hint',
    hintUsed: 'Hint used',
    hintExhausted: 'Hints exhausted',
    loading: 'Loading...',
    submitBtn: 'Submit answer',
    hintBtn1: 'View hint 1',
    hintBtnN: (n) => `View hint ${n}`,
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
    recoveredNote: 'with or without hint',
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
    recoveredNoHintTitle: '✓ Recovered (no hint)',
    incorrectTitle: '✗ Incorrect',
    incorrectBody: 'A hint is available. You can try once more.',
    unresolvedTitle: '✕ Unresolved',
    unresolvedBody: (n) => `The correct answer was ${n}.`,
    questionCounter: (n, total) => `Question ${n} of ${total}`,
    awsLevelLabel: 'AWS LEVEL',
    awsLevelSub: 'Mastery without help · first attempt',
    awsLevelTooltip: 'Correct answers on the first attempt, no hints. The strictest metric in the simulator.',
    examReadiness: 'EXAM READINESS',
    domainReadiness: 'DOMAIN READINESS',
    examReadinessTooltip: 'Preparation estimate based on questions mastered and recovered during the session. Not a guarantee of passing the exam.',
    domainReadinessTooltip: 'Preparation estimate for this specific domain.',
    successEstimateLabel: 'CLF-C02 EXAM SUCCESS ESTIMATE',
    successEstimateTooltip: 'Estimate of alignment with the official CLF-C02 exam domains. Not a prediction of passing.',
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
    statsRecovered: 'Recovered',
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
    timeExpiredPendingNote: 'These were counted as unresolved',
    timeExpiredHint: 'Choose how to continue:',
    timeExpiredViewResults: 'View results',
    timeExpiredRetrySame: 'Retry',
    timeExpiredNewSim: 'New simulator',
    welcomeBadge: 'AWS CLF-C02',
    welcomeBy: 'ValenciaF. Carlos DevOps',
    welcomeTitle: 'Practice Simulator',
    welcomeSubtitle: 'Prepare for the AWS Certified Cloud Practitioner exam with a real sample based on the official exam weights.',
    welcomeFeature1Title: '1,200 questions',
    welcomeFeature1Desc: 'original and unique',
    welcomeFeature2Title: 'Sampling with',
    welcomeFeature2Desc: 'official weights (24/30/34/12)',
    welcomeFeature3Title: 'Progressive hints',
    welcomeFeature3Desc: '+ Concept Insight',
    welcomeFeature4Title: 'AWS Level',
    welcomeFeature4Desc: '+ Final Report + tracking',
    welcomeStep1Title: 'Configure your session',
    welcomeStep1Subtitle: 'Choose the number of questions and practice mode.',
    welcomeOptionQuestions: 'QUESTIONS',
    welcomeOptionExamReal: 'REAL EXAM',
    welcomeRecommended: 'RECOMMENDED',
    welcomeModeTitle: 'Practice mode',
    welcomeModePracticeName: 'Practice Mode',
    welcomeModePracticeDesc: 'No time limit · Learn with hints',
    welcomeModeExamName: 'Exam Mode',
    welcomeModeExamDesc: 'Time limit · Simulates the real exam',
    welcomeStep2Title: 'Select the practice domain',
    welcomeStep2Subtitle: 'By default you will practice with all domains.',
    welcomeDomainHeroName: 'Mixed Exam',
    welcomeDomainHeroDesc: 'All domains · Official CLF-C02 distribution',
    welcomeDomainDistTitle: 'The official exam weights will be used:',
    welcomeDomainPctExam: 'of the exam',
    welcomeDomainToggleLabel: 'Do you want to focus on a single domain?',
    welcomeDomainToggleAction: 'Select specific domain',
    welcomeDomainMixedName: 'Mixed Exam',
    welcomeDomainMixedDesc: 'All domains · Official distribution',
    welcomeStep3Title: 'Results preview',
    welcomeStep3Subtitle: 'When you finish you will see a summary similar to this.',
    welcomePreviewTimeLabel: 'ESTIMATED TIME',
    welcomePreviewTimeValue: '40 – 60 min',
    welcomeAwsLevelTitle: 'AWS LEVEL',
    welcomeAwsLevelExample: 'EXAMPLE',
    welcomeAwsLevelCurrent: 'Current level',
    welcomeAwsLevelTarget: 'Potential level',
    welcomeAwsLevelStrong: 'Strongest domain',
    welcomeAwsLevelWeak: 'Weakest domain',
    welcomeAwsLevelMessage: 'Your final result will be shown here at the end of the simulation.',
    welcomeBenefitsTitle: 'Benefits of this session',
    welcomeBenefit1: 'Updates your AWS Level',
    welcomeBenefit2: 'Identifies areas for improvement',
    welcomeBenefit3: 'Reflected in your Final Report',
    welcomeBenefit4: 'Progressive hints',
    welcomeBenefit5: 'Tracking by domain',
    welcomeCtaStart: 'Start simulation',
    welcomeFooterLine1: 'Independent educational project · Not affiliated with Amazon Web Services',
    welcomeFooterLine2: 'AWS CLF-C02 by ValenciaF. Carlos DevOps',
    startLearningCycle: 'Retry failed',
    startLearningCycleTooltip: 'Practice the concepts you missed with new questions, to demonstrate real understanding rather than memory.',
    retryReportTitle: 'Retry Report',
    retryReportSub: 'Weak concept recovery',
    retryReportAttempt: 'Attempt',
    retryReportConceptsTested: 'Concepts tested',
    retryReportConceptsRecovered: 'Concepts recovered',
    retryReportConceptsRemaining: 'Concepts remaining',
    retryReportRecoveryRate: 'Recovery rate',
    retryReportContinue: 'Retry pending',
    retryReportViewMastery: 'View Mastery Report',
    retryReportEndCycle: 'End cycle',
    retryReportNoMoreQuestions: 'No more questions available for pending concepts.',
    masteryReportTitle: 'Mastery Achieved',
    masteryReportSub: 'You have recovered all weak concepts',
    masteryReportCycleSummary: 'Learning Cycle Summary',
    masteryReportSession: 'Session',
    masteryReportWeakInitial: 'Initial weak concepts',
    masteryReportTotalTime: 'Total duration',
    masteryReportConceptsRemediated: 'Concepts remediated',
    masteryReportNewCycle: 'Start new cycle',
    masteryReportClose: 'Back to start',
    masteryAllRemediated: '✓ All weak concepts were remediated.',
    masteryConceptsRecoveredNote: (n, total) => `${n} of ${total} ${n === 1 ? 'concept recovered' : 'concepts recovered'} successfully.`,
    masteryUnlockedBadge: 'MASTERY UNLOCKED',
    masteryConceptsRemediated: (n) => `${n} / ${n}`,
    learningCycleNoQuestions: 'No more questions available for this concept.',
    learningCycleNoNewQuestions: 'No new questions available for weak concepts. The cycle cannot continue.',
    learningCycleCancel: 'Cancel cycle',
    learningCycleInProgress: 'Learning Cycle in progress',
    learningCycleAttempt: (n) => `Attempt ${n}`,
    learningCycleInitial: 'Initial session',
    learningCycleCompleted: 'Completed',

    // ═══════════════════════════════════════════════════════════
    // v15.1 — METRICS TRANSPARENCY
    // ═══════════════════════════════════════════════════════════
    metricsExplainTitle: 'How are my metrics calculated?',
    metricsExplainSubtitle: 'Understand what each number measures and why they can show different values.',
    metricsShowDetails: 'Show details',
    metricsHideDetails: 'Hide details',
    metricsComparisonTitle: 'Quick comparison',
    metricsComparisonCol1: 'Metric',
    metricsComparisonCol2: 'What it measures',
    metricsComparisonCol3: 'Includes recovered',
    metricsComparisonCol4: 'Includes hints',
    metricsComparisonCol5: 'Weighted',
    metricsComparisonYes: 'Yes',
    metricsComparisonNo: 'No',
    metricsComparisonDash: '—',
    metricsFaqTitle: 'Frequently asked questions',
    metricsFaq1Q: 'Why is my AWS Level lower than my Exam Readiness?',
    metricsFaq1A: 'Because AWS Level only counts first-attempt correct answers without hints, while Exam Readiness also includes questions you recovered after an error.',
    metricsFaq2Q: 'Why does my Success Estimate not match my Exam Readiness?',
    metricsFaq2A: 'Because Success Estimate weights each domain according to its official exam weight (24/30/34/12), while Exam Readiness is a simple average.',
    metricsFaq3Q: 'Why did my AWS Level drop if I recovered questions?',
    metricsFaq3A: 'Because recovering with a hint does not count as mastery without help. AWS Level measures what you master without support.',
    metricsFaq4Q: 'Does Needs Review count questions or concepts?',
    metricsFaq4A: 'Concepts. If you missed three questions of the same concept, it is counted as a single concept with a ×3 counter.',
    metricsAwsLevelName: 'AWS Level',
    metricsAwsLevelWhat: 'Mastery without help',
    metricsExamReadinessName: 'Exam Readiness',
    metricsExamReadinessWhat: 'Preparation with learning',
    metricsSuccessEstimateName: 'Success Estimate',
    metricsSuccessEstimateWhat: 'Alignment with official domains',
    metricsMasteredName: 'Mastered',
    metricsMasteredWhat: 'Correct on first attempt',
    metricsRecoveredName: 'Recovered',
    metricsRecoveredWhat: 'Corrected after error',
    metricsUnresolvedName: 'Unresolved',
    metricsUnresolvedWhat: 'Not resolved',
    metricsNeedsReviewName: 'Needs Review',
    metricsNeedsReviewWhat: 'Concepts to study'
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
  awsLevel: 100,
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
  collapsedReviewDomains: new Set(),
  currentView: 'practice',
  theme: 'light',
  lang: 'es',
  mode: 'practice',
  timerStartAt: null,
  timerTotalSeconds: 0,
  timerIntervalId: null,
  timerExpired: false,
  lastWeakConcept: 'default',
  currentTipIndex: 0,
  pendingUnresolvedQuestion: null,
  learningCycle: null,
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

function countRecovered(records) {
  return records.filter(r => r.state === Q_STATE.RECOVERED_WITH_HINT).length;
}

// ═══════════════════════════════════════════════════════════════
// v15.1 — MÉTRICAS: RENDERIZADO DE TABLA COMPARATIVA + FAQ
// ═══════════════════════════════════════════════════════════════
function renderMetricsComparisonTable() {
  const yes = t('metricsComparisonYes');
  const no  = t('metricsComparisonNo');
  const dash = t('metricsComparisonDash');

  const rows = [
    { name: t('metricsAwsLevelName'),        what: t('metricsAwsLevelWhat'),        rec: no,  hint: no,  weighted: no  },
    { name: t('metricsExamReadinessName'),   what: t('metricsExamReadinessWhat'),   rec: yes, hint: yes, weighted: no  },
    { name: t('metricsSuccessEstimateName'), what: t('metricsSuccessEstimateWhat'), rec: yes, hint: yes, weighted: yes },
    { name: t('metricsMasteredName'),        what: t('metricsMasteredWhat'),        rec: no,  hint: no,  weighted: no  },
    { name: t('metricsRecoveredName'),       what: t('metricsRecoveredWhat'),       rec: yes, hint: yes, weighted: no  },
    { name: t('metricsUnresolvedName'),      what: t('metricsUnresolvedWhat'),      rec: dash, hint: dash, weighted: no  },
    { name: t('metricsNeedsReviewName'),     what: t('metricsNeedsReviewWhat'),     rec: yes, hint: yes, weighted: no  }
  ];

  const cell = (val) => {
    if (val === yes) return `<span class="metric-cell metric-cell--yes">✓</span>`;
    if (val === no)  return `<span class="metric-cell metric-cell--no">—</span>`;
    return `<span class="metric-cell metric-cell--dash">${dash}</span>`;
  };

  return `
    <div class="report-comparison">
      <div class="report-comparison__title">${t('metricsComparisonTitle')}</div>
      <table class="report-comparison__table">
        <thead>
          <tr>
            <th>${t('metricsComparisonCol1')}</th>
            <th>${t('metricsComparisonCol2')}</th>
            <th>${t('metricsComparisonCol3')}</th>
            <th>${t('metricsComparisonCol4')}</th>
            <th>${t('metricsComparisonCol5')}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr>
              <td class="report-comparison__metric-name">${r.name}</td>
              <td>${r.what}</td>
              <td>${cell(r.rec)}</td>
              <td>${cell(r.hint)}</td>
              <td>${cell(r.weighted)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderMetricsFaq() {
  const faqs = [
    { q: t('metricsFaq1Q'), a: t('metricsFaq1A') },
    { q: t('metricsFaq2Q'), a: t('metricsFaq2A') },
    { q: t('metricsFaq3Q'), a: t('metricsFaq3A') },
    { q: t('metricsFaq4Q'), a: t('metricsFaq4A') }
  ];

  return `
    <div class="report-faq">
      <div class="report-faq__title">${t('metricsFaqTitle')}</div>
      <div class="report-faq__list">
        ${faqs.map((f, i) => `
          <details class="report-faq__item">
            <summary class="report-faq__question">${f.q}</summary>
            <div class="report-faq__answer">${f.a}</div>
          </details>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMetricsExplainerBlock() {
  return `
    <div class="report-section report-section--metrics">
      <div class="report-section__title">📐 ${t('metricsExplainTitle')}</div>
      <p class="report-metrics-explainer__subtitle">${t('metricsExplainSubtitle')}</p>

      <details class="report-accordion">
        <summary class="report-accordion__summary">
          <span class="report-accordion__label">${t('metricsShowDetails')}</span>
          <svg class="report-accordion__chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </summary>
        <div class="report-accordion__content">
          ${renderMetricsComparisonTable()}
          ${renderMetricsFaq()}
        </div>
      </details>
    </div>
  `;
}

// =============================================================
// THEME / LANG
// =============================================================
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  state.theme = saved || 'dark';
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

function initLang() {
  const saved = localStorage.getItem(LANG_KEY);
  state.lang = saved || 'es';
  document.documentElement.lang = state.lang;
  const label = document.getElementById('langCurrentLabel');
  if (label) label.textContent = state.lang.toUpperCase();
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === state.lang);
  });
  document.querySelectorAll('.welcome-lang-switch__btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
  });
}

async function setLang(lang) {
  const previousLang = state.lang;
  state.lang = lang === 'en' ? 'en' : 'es';
  localStorage.setItem(LANG_KEY, state.lang);
  document.documentElement.lang = state.lang;
  const label = document.getElementById('langCurrentLabel');
  if (label) label.textContent = state.lang.toUpperCase();
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === state.lang);
  });
  document.querySelectorAll('.welcome-lang-switch__btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
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

  if (previousLang !== state.lang && state.allQuestions.length > 0) {
    const hadActiveSession = state.activeQuestions.length > 0;
    const activeIds = hadActiveSession ? state.activeQuestions.map(q => q.id) : [];
    const previousIndex = state.currentIndex;

    await loadQuestions();

    if (hadActiveSession) {
      state.activeQuestions = activeIds
        .map(id => state.allQuestions.find(q => q.id === id))
        .filter(Boolean);

      if (previousIndex < state.activeQuestions.length) {
        state.currentIndex = previousIndex;
      }

      if (state.currentView === 'practice') {
        renderQuestion();
        renderTopMetrics();
        renderProgressCard();
        renderDomainProgress();
        renderReviewList();
      }
    }
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
    const langFolder = state.lang === 'en' ? 'en/' : '';
    console.log(`📦 Cargando ${LOTES.length} lotes de preguntas (${state.lang.toUpperCase()})...`);

    const loteResults = await Promise.all(
      LOTES.map(async (name) => {
        try {
          let r = await fetch(`./data/${langFolder}${name}`);
          let usedFallback = false;
          if (!r.ok && state.lang === 'en') {
            r = await fetch(`./data/${name}`);
            usedFallback = true;
          }
          if (!r.ok) return { name, status: r.status, questions: [], fallback: false };
          const data = await r.json();
          const arr = Array.isArray(data) ? data : (data.questions || []);
          return { name, status: 200, questions: arr, fallback: usedFallback };
        } catch (err) {
          return { name, status: 'ERROR', questions: [], error: err.message, fallback: false };
        }
      })
    );

    const allQuestions = loteResults.flatMap(r => r.questions);
    if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
      throw new Error('No se cargó ninguna pregunta.');
    }

    state.allQuestions = allQuestions;

    const saved = loadState();
    if (saved && saved.activeQuestionsIds && saved.activeQuestionsIds.length > 0) {
      const restored = saved.activeQuestionsIds
        .map(id => allQuestions.find(q => q.id === id))
        .filter(Boolean);

      if (restored.length > 0) {
        pendingSession = { ...saved, restoredQuestions: restored };
        window.__pendingSession = pendingSession;
      }
    }

    await Promise.resolve();

    window.__questionsLoaded = true;
    document.dispatchEvent(new CustomEvent('questionsLoaded'));
  } catch (error) {
    console.error('❌ Error cargando preguntas:', error);
    const qt = document.getElementById('questionText');
    if (qt) qt.textContent = `Error: ${error.message}`;

    await Promise.resolve();

    window.__questionsLoaded = true;
    window.__questionsLoadFailed = true;
    document.dispatchEvent(new CustomEvent('questionsLoaded'));
  }
}

// =============================================================
// (RESTO DE FUNCIONES SIN CAMBIOS — saveState, loadState, etc.)
// =============================================================

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
    saveSessionBackup();
    saveLearningCycle();
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

function saveSessionBackup() {
  try {
    if (!state.activeQuestions || state.activeQuestions.length === 0) return;
    const backup = {
      sessionId: state.sessionId,
      activeQuestionsIds: state.activeQuestions.map(q => q.id),
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
      timestamp: Date.now()
    };
    localStorage.setItem(SESSION_BACKUP_KEY, JSON.stringify(backup));
  } catch (e) {
    console.warn('No se pudo guardar backup de sesión:', e);
  }
}

function loadSessionBackup() {
  try {
    const raw = localStorage.getItem(SESSION_BACKUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function clearSessionBackup() {
  localStorage.removeItem(SESSION_BACKUP_KEY);
}

// =============================================================
// LEARNING CYCLE — Persistencia
// =============================================================
function saveLearningCycle() {
  try {
    if (!state.learningCycle) {
      localStorage.removeItem(LEARNING_CYCLE_KEY);
      return;
    }
    localStorage.setItem(LEARNING_CYCLE_KEY, JSON.stringify(state.learningCycle));
  } catch (e) {
    console.warn('No se pudo guardar Learning Cycle:', e);
  }
}

function loadLearningCycle() {
  try {
    const raw = localStorage.getItem(LEARNING_CYCLE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function clearLearningCycle() {
  state.learningCycle = null;
  localStorage.removeItem(LEARNING_CYCLE_KEY);
}

// =============================================================
// SAMPLE ESTRATIFICADO
// =============================================================
function calculateStratifiedCounts(totalSize) {
  if (MIXED_DISTRIBUTIONS[totalSize]) {
    return { ...MIXED_DISTRIBUTIONS[totalSize] };
  }
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
  if (!state.allQuestions || state.allQuestions.length === 0) return;

  const totalSize = state.settings.questionCount || 100;
  const domainFilter = state.settings.domain || 'all';

  const pool = sampleQuestionsByWeight(totalSize, domainFilter);
  if (pool.length === 0) return;

  state.activeQuestions = pool;
  state.sessionId = Date.now().toString();
  state.currentIndex = 0;
  state.awsLevel = 100;
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
  state.expandedReviewDomains = new Set();
  state.collapsedReviewDomains = new Set();
  pendingSession = null;
  window.__pendingSession = null;
  clearLearningCycle();

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

  const quizCard = document.querySelector('.quiz-card');
  if (quizCard && !document.getElementById('questionCounter')) {
    quizCard.innerHTML = getPracticeTemplate();
    bindPracticeEvents();
  }

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
  state.timerExpired = true;
  state.answeredThisQuestion = true;
  saveState();

  const total = state.activeQuestions.length;
  const answered = Object.values(state.perQuestion).filter(r => r.state !== Q_STATE.UNSEEN).length;
  const pending = total - answered;

  document.getElementById('timeExpiredAnswered').textContent = answered;
  document.getElementById('timeExpiredPending').textContent = pending;

  let newlyUnresolved = 0;
  Object.values(state.perQuestion).forEach(r => {
    if (r.state === Q_STATE.UNSEEN) {
      r.state = Q_STATE.UNRESOLVED;
      r.unresolved = true;
      state.unresolved += 1;
      newlyUnresolved += 1;
    }
  });

  const unresolvedEl = document.getElementById('timeExpiredUnresolvedCount');
  if (unresolvedEl) unresolvedEl.textContent = newlyUnresolved;

  updateAwsLevel();
  saveState();
  renderTopMetrics();
  renderProgressCard();
  renderDomainProgress();
  renderReviewList();

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
      <span class="option__chevron" aria-hidden="true">›</span>
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
// SUBMIT
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
  const usedHint = record.usedHint === true;

  if (isFirstAttempt) {
    record.state = Q_STATE.ANSWERED_CORRECT;
    record.firstAttemptCorrect = true;
    state.correctFirstAttempt += 1;
  } else {
    record.state = Q_STATE.RECOVERED_WITH_HINT;
    record.recovered = true;
    if (usedHint) {
      record.correctAfterHint = true;
      state.correctAfterHint += 1;
    }
  }

  updateStreak(true);

  document.querySelectorAll('.option').forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('selected');
    if (q.correct.includes(btn.dataset.letter)) btn.classList.add('correct');
  });

  const feedback = document.getElementById('feedbackArea');
  feedback.className = 'feedback success';

  let title;
  if (isFirstAttempt) {
    title = t('correctTitle');
  } else if (usedHint) {
    title = t('recoveredTitle');
  } else {
    title = t('recoveredNoHintTitle');
  }

  feedback.innerHTML = `<strong>${title}</strong>${state.settings.immediateExplanation ? (q.explanation || '') : ''}`;

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
    updateConceptInsight(record);

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
        <span id="hintBtnLabel">${t('hintBtn')}</span>
      `;
    }
  } else {
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

    updateConceptInsight(record);
    state.pendingUnresolvedQuestion = { q, record };
    showUnresolvedModal(q);
  }
}

function useHint() {
  const q = state.activeQuestions[state.currentIndex];
  const record = state.perQuestion[q.id];
  if (record.state !== Q_STATE.REVIEW) return;
  if (!state.settings.showHints) return;

  const hint = q.hint1 || q.hint2 || '';
  if (!hint) return;

  const feedback = document.getElementById('feedbackArea');
  feedback.className = 'feedback hint-open';
  feedback.innerHTML = `<strong>💡 ${t('hintBtn')}</strong>${hint}`;

  record.usedHint = true;
  state.hintUsedThisQuestion = true;
  record.history.push({ hint: 1, usedHint: true });

  const hintBtn = document.getElementById('hintBtn');
  hintBtn.disabled = true;
  hintBtn.innerHTML = `
    <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>
    <span id="hintBtnLabel">${t('hintUsed')}</span>
  `;
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

    if (state.learningCycle) {
      const total = state.activeQuestions.length;
      const mastered = Object.values(state.perQuestion).filter(r => r.state === Q_STATE.ANSWERED_CORRECT).length;
      const recovered = countRecovered(Object.values(state.perQuestion));
      const unresolved = Object.values(state.perQuestion).filter(r => r.state === Q_STATE.UNRESOLVED).length;

      const lastRetry = state.learningCycle.retries[state.learningCycle.retries.length - 1];
      if (lastRetry) {
        lastRetry.completedAt = Date.now();
        lastRetry.results = { mastered, recovered, unresolved };
      }

      showRetryReport();
    } else {
      showFinalReport();
    }
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
  const perQuestion = saved.perQuestion || {};
  const answered = Object.values(perQuestion).filter(r => r.state !== Q_STATE.UNSEEN).length;
  const mastered = Object.values(perQuestion).filter(r => r.state === Q_STATE.ANSWERED_CORRECT).length;
  const awsLevel = total > 0 ? Math.round((mastered / total) * 100) : 0;
  const modeLabel = saved.mode === 'exam' ? 'Exam' : 'Practice';

  let startedLabel = '—';
  if (saved.sessionId) {
    const ts = parseInt(saved.sessionId, 10);
    if (!isNaN(ts)) {
      const d = new Date(ts);
      const locale = state.lang === 'en' ? 'en-US' : 'es-ES';
      startedLabel = d.toLocaleDateString(locale, {
        day: '2-digit', month: 'short', year: 'numeric'
      });
    }
  }

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setTxt('sessionTotal', total);
  setTxt('sessionProgress', `${answered} / ${total}`);
  setTxt('sessionMode', modeLabel);
  setTxt('sessionAwsLevel', `${awsLevel}%`);
  setTxt('sessionStarted', startedLabel);

  const welcomeOverlay = document.getElementById('welcomeOverlay');
  if (welcomeOverlay) welcomeOverlay.classList.add('hidden');

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
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
  setTimeout(() => {
    if (state.currentView === 'practice') nextQuestion();
  }, 100);
}

// =============================================================
// METRICS
// =============================================================
function updateAwsLevel() {
  const total = state.activeQuestions.length;
  if (total === 0) { state.awsLevel = 100; return; }
  const errors = Object.values(state.perQuestion).filter(r =>
    r.state === Q_STATE.RECOVERED_WITH_HINT ||
    r.state === Q_STATE.UNRESOLVED ||
    r.state === Q_STATE.REVIEW ||
    (r.state !== Q_STATE.UNSEEN && !r.firstAttemptCorrect)
  ).length;
  state.awsLevel = Math.round(((total - errors) / total) * 100);
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
    if (state.awsLevel >= 90) awsLevelMsg.textContent = t('awsMsgGreat');
    else if (state.awsLevel >= 75) awsLevelMsg.textContent = t('awsMsgGood');
    else if (state.awsLevel >= 50) awsLevelMsg.textContent = t('awsMsgReinforce');
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
  const recovered = countRecovered(records);
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
// NEEDS REVIEW
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
    const isExpanded = !state.collapsedReviewDomains.has(domain);
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
  if (state.collapsedReviewDomains.has(domain)) {
    state.collapsedReviewDomains.delete(domain);
  } else {
    state.collapsedReviewDomains.add(domain);
  }
  renderReviewList();
}
window.toggleReviewGroup = toggleReviewGroup;

// =============================================================
// CONCEPT INSIGHT
// =============================================================
function updateConceptInsight(record) {
  if (!record) return;

  const label = getCanonicalConcept(record);
  const finalLabel = (label && label !== 'Otros')
    ? label
    : (record.concept || record.service || 'default');

  state.lastWeakConcept = finalLabel;
  renderConceptInsight();
}

function renderConceptInsight() {
  const container = document.getElementById('conceptInsightText');
  if (!container) return;

  const key = state.lastWeakConcept;
  let detail = CONCEPT_DETAILS[key];

  if (!detail && key && key !== 'default') {
    const record = Object.values(state.perQuestion).find(r =>
      getCanonicalConcept(r) === key
    );

    const domain = record?.domain || '';

    const domainIntros = {
      'Cloud Concepts': `"${key}" es un concepto clave del dominio Cloud Concepts. Aparece frecuentemente en preguntas sobre fundamentos de la nube.`,
      'Security & Compliance': `"${key}" pertenece al dominio Security & Compliance. Es importante entender cómo se aplica dentro del modelo de responsabilidad compartida.`,
      'Technology & Services': `"${key}" es un servicio o característica del dominio Technology & Services. Familiarízate con sus casos de uso típicos.`,
      'Billing, Pricing & Support': `"${key}" forma parte del dominio Billing, Pricing & Support. Aprende cómo afecta a la facturación y el soporte de AWS.`
    };

    const domainTips = {
      'Cloud Concepts': `Repasa los fundamentos de "${key}" antes del examen.`,
      'Security & Compliance': `Presta especial atención a los permisos y políticas de "${key}".`,
      'Technology & Services': `Estudia los casos de uso reales de "${key}" en AWS.`,
      'Billing, Pricing & Support': `Revisa cómo "${key}" impacta en los costos de AWS.`
    };

    detail = {
      name: key,
      text: domainIntros[domain] || `"${key}" es un concepto relevante que apareció en tu sesión. Revisa la documentación oficial de AWS para profundizar.`,
      tip: domainTips[domain] || `Este concepto apareció en la sesión actual. Presta atención a sus casos de uso típicos.`
    };
  }

  if (!detail) detail = CONCEPT_DETAILS['default'];

  container.innerHTML = `
    <div class="concept-insight__name">${detail.name}</div>
    <div class="concept-insight__text">${detail.text}</div>
  `;

  const tipPanel = document.getElementById('examTipPanel');
  const tipContainer = document.getElementById('examTipText');
  if (tipContainer && tipPanel) {
    const tipText = (detail.tip || '').trim();
    tipContainer.textContent = tipText;
    const shouldShow = tipText.length > 0;
    tipPanel.classList.toggle('is-hidden', !shouldShow);
  }
}

// =============================================================
// STUDY TIP ROTATIVO
// =============================================================
function rotateTip() {
  const tipEl = document.getElementById('studyTipText');
  if (!tipEl) return;

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
  const records = Object.values(state.perQuestion);
  const mastered = records.filter(r => r.state === Q_STATE.ANSWERED_CORRECT).length;
  const recovered = countRecovered(records);
  const unresolved = records.filter(r => r.state === Q_STATE.UNRESOLVED).length;
  const isMixedExam = state.settings.domain === 'all';

  const errors = records.filter(r =>
    r.state === Q_STATE.RECOVERED_WITH_HINT ||
    r.state === Q_STATE.UNRESOLVED ||
    r.state === Q_STATE.REVIEW ||
    (r.state !== Q_STATE.UNSEEN && !r.firstAttemptCorrect)
  ).length;
  const awsLevel = total > 0 ? Math.round(((total - errors) / total) * 100) : 100;
  const resolved = mastered + recovered;
  const readinessPct = total > 0 ? Math.round((resolved / total) * 100) : 0;
  const readinessLabel = isMixedExam ? t('examReadiness') : t('domainReadiness');
  const readinessTooltip = isMixedExam ? t('examReadinessTooltip') : t('domainReadinessTooltip');

  let successEstimate = null;
  if (isMixedExam) {
    let weighted = 0;
    let totalWeight = 0;
    Object.entries(DOMAIN_DEFS).forEach(([domain, def]) => {
      const domainQs = state.activeQuestions.filter(q => normalizeDomain(q.domain) === domain);
      const domainTotal = domainQs.length;
      if (domainTotal === 0) return;
      const domainResolved = domainQs.filter(q => {
        const r = state.perQuestion[q.id];
        return r && (r.state === Q_STATE.ANSWERED_CORRECT || r.state === Q_STATE.RECOVERED_WITH_HINT);
      }).length;
      weighted += (domainResolved / domainTotal) * 100 * (def.weight / 100);
      totalWeight += def.weight / 100;
    });
    const value = totalWeight > 0 ? Math.round(weighted / totalWeight) : 0;
    successEstimate = { value, status: getSuccessEstimateStatus(value) };
  }

  const conceptMap = new Map();
  records.forEach(r => {
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
        <div class="report-section__title">
          🏆 ${t('successEstimateLabel')}
          <span class="info-tooltip info-tooltip--sm" data-tooltip="${t('successEstimateTooltip')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </span>
        </div>
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

      ${renderMetricsExplainerBlock()}

      <p class="final-disclaimer">${t('finalDisclaimer')}</p>

      <div class="final-actions">
        <button id="restartBtn" class="btn btn--primary">🔄 ${t('repeatSim')}</button>
        ${conceptMap.size > 0 ? `<button id="retryFailedBtn" class="btn btn--secondary" title="${t('startLearningCycleTooltip')}">🎓 ${t('startLearningCycle')} (${conceptMap.size})</button>` : ''}
      </div>
    </div>
  `;

  document.getElementById('restartBtn')?.addEventListener('click', () => {
    clearState();
    clearLearningCycle();
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

  document.getElementById('retryFailedBtn')?.addEventListener('click', () => {
    clearLearningCycle();
    startLearningCycle();
  });
}

// =============================================================
// LEARNING CYCLE — Pre-validación de disponibilidad
// =============================================================
function countAvailableQuestionsForCycle(weakConcepts) {
  if (!weakConcepts || weakConcepts.length === 0) return 0;

  const usedIds = new Set();
  state.activeQuestions.forEach(q => usedIds.add(q.id));
  if (state.learningCycle && Array.isArray(state.learningCycle.retries)) {
    state.learningCycle.retries.forEach(r => {
      (r.questionsUsed || []).forEach(id => usedIds.add(id));
    });
  }

  const weakSet = new Set(weakConcepts);
  let count = 0;

  state.allQuestions.forEach(q => {
    if (usedIds.has(q.id)) return;
    const label = getCanonicalConcept({
      concept: q.concept || '',
      service: q.service || '',
      domain: q.domain
    });
    if (weakSet.has(label)) count += 1;
  });

  return count;
}

// =============================================================
// LEARNING CYCLE — Start / Retry / Mastery
// =============================================================
function startLearningCycle() {
  const weakConceptsMap = new Map();
  Object.values(state.perQuestion).forEach(r => {
    if (r.state === Q_STATE.RECOVERED_WITH_HINT || r.state === Q_STATE.UNRESOLVED) {
      const label = getCanonicalConcept(r);
      if (!weakConceptsMap.has(label)) {
        weakConceptsMap.set(label, { label, domain: r.domain, originalIds: new Set() });
      }
      weakConceptsMap.get(label).originalIds.add(r.id);
    }
  });

  if (weakConceptsMap.size === 0) return;

  if (!state.learningCycle) {
    state.learningCycle = {
      cycleId: Date.now().toString(),
      startedAt: Date.now(),
      initialSession: {
        totalQuestions: state.activeQuestions.length,
        mastered: Object.values(state.perQuestion).filter(r => r.state === Q_STATE.ANSWERED_CORRECT).length,
        recovered: countRecovered(Object.values(state.perQuestion)),
        unresolved: Object.values(state.perQuestion).filter(r => r.state === Q_STATE.UNRESOLVED).length,
        weakConcepts: [...weakConceptsMap.keys()]
      },
      retries: [],
      status: 'in_progress',
      completedAt: null
    };
  }

  if (!Array.isArray(state.learningCycle.pendingWeakConcepts)) {
    state.learningCycle.pendingWeakConcepts = [...weakConceptsMap.keys()];
  }

  const currentWeakConcepts = [...state.learningCycle.pendingWeakConcepts];

  const usedIds = new Set();
  state.activeQuestions.forEach(q => usedIds.add(q.id));
  state.learningCycle.retries.forEach(r => {
    (r.questionsUsed || []).forEach(id => usedIds.add(id));
  });

  const newQuestions = [];
  const conceptsWithoutQuestions = [];

  currentWeakConcepts.forEach(conceptLabel => {
    const candidates = state.allQuestions.filter(q => {
      if (usedIds.has(q.id)) return false;
      const record = {
        concept: q.concept || '',
        service: q.service || '',
        domain: q.domain
      };
      return getCanonicalConcept(record) === conceptLabel;
    });

    if (candidates.length === 0) {
      conceptsWithoutQuestions.push(conceptLabel);
      return;
    }

    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    newQuestions.push(picked);
    usedIds.add(picked.id);
  });

  if (newQuestions.length === 0) {
    showRetryReport();
    return;
  }

  state.activeQuestions = newQuestions;
  state.sessionId = Date.now().toString();
  state.currentIndex = 0;
  state.awsLevel = 100;
  state.currentStreak = 0;
  state.bestStreak = 0;
  state.totalAttempts = 0;
  state.correctFirstAttempt = 0;
  state.correctAfterHint = 0;
  state.unresolved = 0;
  state.perQuestion = {};
  state.lastWeakConcept = 'default';
  state.timerExpired = false;
  state.pendingUnresolvedQuestion = null;
  state.expandedReviewDomains = new Set();
  state.collapsedReviewDomains = new Set();

  newQuestions.forEach(q => {
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

  state.learningCycle.retries.push({
    attemptNumber: state.learningCycle.retries.length + 1,
    startedAt: Date.now(),
    conceptsTested: newQuestions.map(q => getCanonicalConcept({
      concept: q.concept || '',
      service: q.service || '',
      domain: q.domain
    })),
    conceptsWithoutQuestions,
    questionsUsed: newQuestions.map(q => q.id),
    results: null,
    weakConceptsAfter: null
  });

  state.currentView = 'practice';
  const quizCard = document.querySelector('.quiz-card');
  if (quizCard) {
    quizCard.innerHTML = getPracticeTemplate();
    bindPracticeEvents();
  }

  stopExamTimer();
  saveState();
  saveLearningCycle();
  renderAll();
}

function showRetryReport() {
  if (!state.learningCycle) {
    showFinalReport();
    return;
  }

  const total = state.activeQuestions.length;
  const records = Object.values(state.perQuestion);
  const mastered = records.filter(r => r.state === Q_STATE.ANSWERED_CORRECT).length;
  const recovered = countRecovered(records);
  const unresolved = records.filter(r => r.state === Q_STATE.UNRESOLVED).length;

  const lastRetry = state.learningCycle.retries[state.learningCycle.retries.length - 1];

  const testedLabels = new Set(lastRetry?.conceptsTested || []);
  const weakFromThisAttempt = new Set();
  records.forEach(r => {
    if (r.state === Q_STATE.RECOVERED_WITH_HINT || r.state === Q_STATE.UNRESOLVED) {
      weakFromThisAttempt.add(getCanonicalConcept(r));
    }
  });

  const prevPending = new Set(state.learningCycle.pendingWeakConcepts || []);
  const newPending = new Set();

  prevPending.forEach(c => {
    if (!testedLabels.has(c)) newPending.add(c);
  });
  weakFromThisAttempt.forEach(c => newPending.add(c));

  state.learningCycle.pendingWeakConcepts = [...newPending];
  const currentWeakConcepts = new Set(state.learningCycle.pendingWeakConcepts);

  if (lastRetry) {
    lastRetry.completedAt = Date.now();
    lastRetry.results = { mastered, recovered, unresolved };
    lastRetry.weakConceptsAfter = [...currentWeakConcepts];
  }

  const errors = records.filter(r =>
    r.state === Q_STATE.RECOVERED_WITH_HINT ||
    r.state === Q_STATE.UNRESOLVED ||
    r.state === Q_STATE.REVIEW ||
    (r.state !== Q_STATE.UNSEEN && !r.firstAttemptCorrect)
  ).length;
  const awsLevel = total > 0 ? Math.round(((total - errors) / total) * 100) : 100;

  const conceptsTested = lastRetry ? lastRetry.conceptsTested.length : 0;
  const conceptsRecovered = Math.max(0, conceptsTested - currentWeakConcepts.size);
  const recoveryRate = conceptsTested > 0 ? Math.round((conceptsRecovered / conceptsTested) * 100) : 0;

  const hasRemainingWeak = currentWeakConcepts.size > 0;

  if (!hasRemainingWeak) {
    state.learningCycle.status = 'mastered';
    state.learningCycle.completedAt = Date.now();
    saveLearningCycle();
    showMasteryReport();
    return;
  }

  const availableQuestions = countAvailableQuestionsForCycle([...currentWeakConcepts]);
  const canContinueCycle = availableQuestions > 0;

  const quizCard = document.querySelector('.quiz-card');
  quizCard.innerHTML = `
    <div class="final-report">
      <div class="report-hero" style="background: linear-gradient(160deg, #7C3AED 0%, #4C1D95 100%); border-top-color: #A78BFA;">
        <div class="report-hero__label" style="color: #DDD6FE;">🎓 ${t('retryReportTitle')}</div>
        <div><span class="report-hero__value">${awsLevel}</span><span class="report-hero__denom">%</span></div>
        <div class="report-hero__subtitle">${t('retryReportSub')} · ${t('learningCycleAttempt', state.learningCycle.retries.length)}</div>
      </div>

      <div class="report-metrics">
        <div class="report-metric-card report-metric-card--highlight">
          <span class="report-metric-card__label">🎯 ${t('retryReportConceptsTested')}</span>
          <span class="report-metric-card__value">${conceptsTested}</span>
          <span class="report-metric-card__note">${t('learningCycleAttempt', state.learningCycle.retries.length)}</span>
        </div>
        <div class="report-metric-card report-metric-card--highlight">
          <span class="report-metric-card__label">✅ ${t('retryReportConceptsRecovered')}</span>
          <span class="report-metric-card__value">${conceptsRecovered}</span>
          <span class="report-metric-card__note">${recoveryRate}% ${t('retryReportRecoveryRate').toLowerCase()}</span>
        </div>
        <div class="report-metric-card">
          <span class="report-metric-card__label">📚 ${t('retryReportConceptsRemaining')}</span>
          <span class="report-metric-card__value">${currentWeakConcepts.size}</span>
          <span class="report-metric-card__note">${t('needsReviewNote')}</span>
        </div>
        <div class="report-metric-card">
          <span class="report-metric-card__label">📊 ${t('retryReportRecoveryRate')}</span>
          <span class="report-metric-card__value">${recoveryRate}</span>
          <span class="report-metric-card__note">%</span>
        </div>
      </div>

      <div class="report-section">
        <div class="report-section__title">${t('needsStudy')}</div>
        <ul class="report-concepts">
          ${[...currentWeakConcepts].map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>

      ${!canContinueCycle ? `
      <div class="report-message report-message--mid" style="margin-top: 16px;">
        ${t('retryReportNoMoreQuestions')}
      </div>
      ` : ''}

      <p class="final-disclaimer">${t('finalDisclaimer')}</p>

      <div class="final-actions">
        ${canContinueCycle
          ? `<button id="continueCycleBtn" class="btn btn--primary">🎯 ${t('retryReportContinue')} (${currentWeakConcepts.size})</button>`
          : `<button id="endCycleBtn" class="btn btn--primary">✅ ${t('retryReportEndCycle')}</button>`
        }
        ${canContinueCycle
          ? `<button id="endCycleBtn" class="btn btn--secondary">${t('retryReportEndCycle')}</button>`
          : `<button id="masteryCloseBtnFallback" class="btn btn--secondary">${t('masteryReportClose')}</button>`
        }
      </div>
    </div>
  `;

  document.getElementById('continueCycleBtn')?.addEventListener('click', () => {
    startLearningCycle();
  });

  document.getElementById('endCycleBtn')?.addEventListener('click', () => {
    state.learningCycle.status = 'completed_partial';
    state.learningCycle.completedAt = Date.now();
    saveLearningCycle();
    state.currentView = 'final';
    showFinalReport();
  });

  document.getElementById('masteryCloseBtnFallback')?.addEventListener('click', () => {
    clearLearningCycle();
    state.currentView = 'practice';
    const qc = document.querySelector('.quiz-card');
    if (qc) {
      qc.innerHTML = getPracticeTemplate();
      bindPracticeEvents();
    }
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

  saveLearningCycle();
}

function showMasteryReport() {
  if (!state.learningCycle) return;

  const cycle = state.learningCycle;
  const initial = cycle.initialSession || {};
  const weakInitial = Array.isArray(initial.weakConcepts) ? initial.weakConcepts : [];
  const pending = Array.isArray(cycle.pendingWeakConcepts) ? cycle.pendingWeakConcepts : [];

  const startedAt = cycle.startedAt || Date.now();
  const completedAt = cycle.completedAt || Date.now();
  const totalMs = Math.max(0, completedAt - startedAt);
  const totalMin = Math.floor(totalMs / 60000);
  const totalSec = Math.floor((totalMs % 60000) / 1000);
  const durationLabel = `${String(totalMin).padStart(2, '0')}:${String(totalSec).padStart(2, '0')}`;

  const remediated = weakInitial.length;

  const quizCard = document.querySelector('.quiz-card');
  if (!quizCard) return;

  quizCard.innerHTML = `
    <div class="final-report">
      <div class="report-hero" style="background: linear-gradient(160deg, #16A34A 0%, #065F46 100%); border-top-color: #86EFAC;">
        <div class="report-hero__label" style="color: #BBF7D0;">🏅 ${t('masteryReportTitle')}</div>
        <div><span class="report-hero__value">100</span><span class="report-hero__denom">%</span></div>
        <div class="report-hero__subtitle">${t('masteryReportSub')}</div>
      </div>

      <div class="report-section">
        <div class="report-section__title">${t('masteryReportCycleSummary')}</div>
        <ul class="report-list">
          <li class="report-list__item report-list__item--green">
            <strong>${t('masteryReportSession')}</strong>
            <span>${cycle.cycleId || '—'}</span>
          </li>
          <li class="report-list__item report-list__item--green">
            <strong>${t('masteryReportWeakInitial')}</strong>
            <span>${weakInitial.length}</span>
          </li>
          <li class="report-list__item report-list__item--green">
            <strong>${t('masteryReportTotalTime')}</strong>
            <span>${durationLabel}</span>
          </li>
          <li class="report-list__item report-list__item--green">
            <strong>${t('masteryReportConceptsRemediated')}</strong>
            <span>${remediated} / ${remediated}</span>
          </li>
        </ul>
      </div>

      ${pending.length === 0 ? `
      <div class="report-section">
        <div class="report-section__title">${t('masteryAllRemediated')}</div>
        <p class="report-section__empty">${t('masteryConceptsRecoveredNote', weakInitial.length, weakInitial.length)}</p>
      </div>
      ` : `
      <div class="report-section">
        <div class="report-section__title">${t('needsStudy')}</div>
        <ul class="report-concepts">
          ${pending.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
      `}

      <p class="final-disclaimer">${t('finalDisclaimer')}</p>

      <div class="final-actions">
        <button id="masteryNewCycleBtn" class="btn btn--primary">🔄 ${t('masteryReportNewCycle')}</button>
        <button id="masteryCloseBtn" class="btn btn--secondary">${t('masteryReportClose')}</button>
      </div>
    </div>
  `;

  document.getElementById('masteryNewCycleBtn')?.addEventListener('click', () => {
    clearLearningCycle();
    state.currentView = 'practice';
    const qc = document.querySelector('.quiz-card');
    if (qc) {
      qc.innerHTML = getPracticeTemplate();
      bindPracticeEvents();
    }
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

  document.getElementById('masteryCloseBtn')?.addEventListener('click', () => {
    clearLearningCycle();
    state.currentView = 'practice';
    const qc = document.querySelector('.quiz-card');
    if (qc) {
      qc.innerHTML = getPracticeTemplate();
      bindPracticeEvents();
    }
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

  saveLearningCycle();
}

// =============================================================
// RETRY SAME SESSION
// =============================================================
function retrySameSession() {
  if (!state.activeQuestions || state.activeQuestions.length === 0) return;

  const sameQuestions = state.activeQuestions.map(q => ({ ...q }));

  state.activeQuestions = sameQuestions;
  state.sessionId = Date.now().toString();
  state.currentIndex = 0;
  state.awsLevel = 100;
  state.currentStreak = 0;
  state.bestStreak = 0;
  state.totalAttempts = 0;
  state.correctFirstAttempt = 0;
  state.correctAfterHint = 0;
  state.unresolved = 0;
  state.perQuestion = {};
  state.lastWeakConcept = 'default';
  state.timerExpired = false;
  state.pendingUnresolvedQuestion = null;
  state.expandedReviewDomains = new Set();
  state.collapsedReviewDomains = new Set();
  clearLearningCycle();

  sameQuestions.forEach(q => {
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
  if (quizCard) {
    quizCard.innerHTML = getPracticeTemplate();
    bindPracticeEvents();
  }

  if (state.mode === 'exam') {
    const minutes = EXAM_TIME_MINUTES[state.activeQuestions.length] || 60;
    startExamTimer(minutes * 60, Date.now());
  } else {
    stopExamTimer();
  }

  saveState();
  renderAll();
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

  const recoveredCount = countRecovered(Object.values(state.perQuestion));

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
            <span>${recoveredCount}</span>
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
  const prevBtn = document.getElementById('tickerPrev');
  const nextBtn = document.getElementById('tickerNext');

  if (!track || !viewport) return;

  const services = window.awsServices;

  if (!Array.isArray(services) || services.length === 0) {
    return;
  }

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

  let impulseTimer = null;

  const startImpulse = (direction) => {
    track.style.animationPlayState = 'paused';
    track.style.animation = 'none';
    track.offsetHeight;
    const impulseAnim = direction < 0
      ? 'tickerImpulseLeft 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)'
      : 'tickerImpulseRight 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
    track.style.animation = impulseAnim;
    if (impulseTimer) clearTimeout(impulseTimer);
    impulseTimer = setTimeout(() => {
      track.style.animation = '';
      track.style.animationPlayState = 'running';
    }, 600);
  };

  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      startImpulse(-1);
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      startImpulse(1);
    };
  }

  track.querySelectorAll('.ticker-item').forEach((item) => {
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

  viewport.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
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
  requestAnimationFrame(() => {
    if (tooltipEl) tooltipEl.classList.add('is-visible');
  });
}

function hideTickerTooltip() {
  if (tooltipEl) {
    tooltipEl.classList.remove('is-visible');
    const tt = tooltipEl;
    setTimeout(() => tt.remove(), 200);
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
      <div class="welcome-domain-hero__dist-title">${t('welcomeDomainDistTitle')}</div>
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
      <div class="welcome-preview__dist-title"><span>${totalCount}</span> ${t('welcomeOptionQuestions').toLowerCase()}</div>
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
    <div class="welcome-preview__dist-title"><span>${totalCount}</span> ${t('welcomeOptionQuestions').toLowerCase()}</div>
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
    toggleLabel.textContent = t('welcomeDomainToggleLabel');
    toggleAction.textContent = t('welcomeDomainToggleAction');
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
    startLabel.textContent = t('welcomeCtaStart');
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
  const welcomeLangBtns = document.querySelectorAll('.welcome-lang-switch__btn');

  if (!overlay || !startBtn) return;

  let selectedCount = 100;
  let selectedDomain = 'all';
  let selectedMode = 'exam';

  function updateCTA() {
    if (selectedCount !== null) {
      startBtn.disabled = false;
      startBtn.classList.remove('is-disabled');
      startLabel.textContent = t('welcomeCtaStart');
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

  welcomeLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
    });
  });

  function resetWelcomeModal() {
    selectedCount = 100;
    selectedDomain = 'all';
    selectedMode = 'exam';

    countOptions.forEach(o => o.classList.remove('is-selected'));
    const defaultCount = document.querySelector('#welcomeQuestionCount .welcome-option[data-count="100"]');
    if (defaultCount) defaultCount.classList.add('is-selected');

    modeButtons.forEach(b => b.classList.toggle('is-selected', b.dataset.mode === 'exam'));

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

  state.learningCycle = loadLearningCycle();

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

  document.getElementById('sessionContinueBtn')?.addEventListener('click', () => {
    document.getElementById('sessionFoundOverlay').classList.add('hidden');
    document.body.style.overflow = '';
    restoreSession();
  });

  document.getElementById('sessionNewBtn')?.addEventListener('click', () => {
    document.getElementById('sessionFoundOverlay').classList.add('hidden');
    clearState();
    clearLearningCycle();
    pendingSession = null;
    window.__pendingSession = null;
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

  document.getElementById('cancelNewSimBtn')?.addEventListener('click', () => {
    document.getElementById('confirmNewSimOverlay').classList.add('hidden');
  });
  document.getElementById('confirmNewSimBtn')?.addEventListener('click', () => {
    document.getElementById('confirmNewSimOverlay').classList.add('hidden');
    clearState();
    clearLearningCycle();
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

  document.getElementById('unresolvedUnderstoodBtn')?.addEventListener('click', hideUnresolvedModal);

  document.getElementById('viewResultsBtn')?.addEventListener('click', () => {
    document.getElementById('timeExpiredOverlay').classList.add('hidden');
    state.currentView = 'final';
    stopExamTimer();
    showFinalReport();
  });

  document.getElementById('retrySameBtn')?.addEventListener('click', () => {
    document.getElementById('timeExpiredOverlay').classList.add('hidden');
    retrySameSession();
  });

  document.getElementById('newSimFromTimeoutBtn')?.addEventListener('click', () => {
    document.getElementById('timeExpiredOverlay').classList.add('hidden');
    clearState();
    clearLearningCycle();
    stopExamTimer();
    state.currentView = 'practice';
    const quizCard = document.querySelector('.quiz-card');
    if (quizCard) {
      quizCard.innerHTML = getPracticeTemplate();
      bindPracticeEvents();
    }
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

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
    clearLearningCycle();
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
  }, 100);
});

// =============================================================
// FLUJO DE ARRANQUE
// =============================================================
function checkSavedSession() {
  if (window.__questionsLoadFailed) {
    const welcome = document.getElementById('welcomeOverlay');
    if (welcome) {
      if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
      welcome.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    return;
  }

  if (pendingSession && pendingSession.restoredQuestions && pendingSession.restoredQuestions.length > 0) {
    const welcome = document.getElementById('welcomeOverlay');
    if (welcome) welcome.classList.add('hidden');
    showSessionFoundModal(pendingSession.restoredQuestions.length, pendingSession);
    return;
  }

  const welcome = document.getElementById('welcomeOverlay');
  if (welcome) {
    if (typeof window.resetWelcomeModal === 'function') window.resetWelcomeModal();
    welcome.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function restoreSession() {
  if (!pendingSession) return false;
  const { restoredQuestions, ...saved } = pendingSession;

  state.activeQuestions = restoredQuestions;
  state.sessionId = saved.sessionId;
  state.currentIndex = saved.currentIndex || 0;
  state.awsLevel = saved.awsLevel ?? 100;
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

  if (state.mode === 'exam' && state.timerStartAt) {
    const elapsed = Math.floor((Date.now() - state.timerStartAt) / 1000);
    const remaining = state.timerTotalSeconds - elapsed;
    if (remaining > 0) {
      startExamTimer(state.timerTotalSeconds, state.timerStartAt);
    } else {
      state.timerExpired = true;
      state.timerStartAt = Date.now() - (state.timerTotalSeconds * 1000);
    }
  }

  if (state.learningCycle) {
    const sessionIds = new Set(state.activeQuestions.map(q => q.id));
    const lastRetry = state.learningCycle.retries[state.learningCycle.retries.length - 1];
    const retryIds = lastRetry && Array.isArray(lastRetry.questionsUsed)
      ? new Set(lastRetry.questionsUsed)
      : new Set();

    const sameSet =
      sessionIds.size > 0 &&
      retryIds.size > 0 &&
      sessionIds.size === retryIds.size &&
      [...sessionIds].every(id => retryIds.has(id));

    if (!sameSet) {
      clearLearningCycle();
    }
  }

  if (state.learningCycle && !Array.isArray(state.learningCycle.pendingWeakConcepts)) {
    const initial = state.learningCycle.initialSession?.weakConcepts;
    state.learningCycle.pendingWeakConcepts = Array.isArray(initial) ? [...initial] : [];
    saveLearningCycle();
  }

  return true;
}

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
window.retrySameSession = retrySameSession;
window.startLearningCycle = startLearningCycle;
window.showRetryReport = showRetryReport;
window.showMasteryReport = showMasteryReport;
window.clearLearningCycle = clearLearningCycle;
window.countAvailableQuestionsForCycle = countAvailableQuestionsForCycle;

window.__debug = {
  showModal: () => document.getElementById('welcomeOverlay')?.classList.remove('hidden'),
  hideModal: () => document.getElementById('welcomeOverlay')?.classList.add('hidden'),
  clearStorage: () => { localStorage.clear(); },
  state: () => state,
  pendingSession: () => window.__pendingSession,
  distributions: () => MIXED_DISTRIBUTIONS,
  tips: () => EXAM_TIPS,
  concepts: () => CONCEPT_DETAILS,
  learningCycle: () => state.learningCycle
};

// =============================================================
// v12.0 ADDITIONS — Splash + About Modal
// =============================================================
function initSplash() {
  const splash = document.getElementById('splashOverlay');
  if (!splash) return;

  if (sessionStorage.getItem('splashShown') === 'true') {
    splash.classList.add('hidden');
    return;
  }
  sessionStorage.setItem('splashShown', 'true');

  const SPLASH_DURATION = 3000;

  const hideSplash = () => {
    splash.classList.add('is-fading');
    setTimeout(() => {
      splash.classList.add('hidden');
      document.body.style.overflow = '';
    }, 500);
  };

  const autoHideTimer = setTimeout(hideSplash, SPLASH_DURATION);

  splash.addEventListener('click', () => {
    clearTimeout(autoHideTimer);
    hideSplash();
  }, { once: true });

  document.body.style.overflow = 'hidden';
}

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initV12Additions);
} else {
  initV12Additions();
}

function initV12Additions() {
  try {
    initSplash();
  } catch (e) {
    document.getElementById('splashOverlay')?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  setTimeout(() => {
    const s = document.getElementById('splashOverlay');
    if (s && !s.classList.contains('hidden')) {
      s.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 5000);

  try {
    setupAboutModal();
  } catch (e) {
    console.error('❌ setupAboutModal:', e);
  }

  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const splash = document.getElementById('splashOverlay');

  if (welcomeOverlay) welcomeOverlay.classList.add('hidden');

  const runCheck = () => {
    if (window.__questionsLoaded) {
      checkSavedSession();
      return;
    }
    document.addEventListener('questionsLoaded', () => {
      checkSavedSession();
    }, { once: true });
  };

  if (splash && !splash.classList.contains('hidden')) {
    setTimeout(runCheck, 3600);
  } else {
    runCheck();
  }
}