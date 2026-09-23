/* =============================================================
   AWS SERVICES - Ticker data (16 servicios CLF-C02)
   ============================================================= */

const awsServices = [
  {
    "id": "ec2",
    "name": "Amazon EC2",
    "shortName": "EC2",
    "category": "Compute",
    "categoryLabel": { "es": "Cómputo", "en": "Compute" },
    "color": "compute",
    "description": {
      "es": "Amazon Elastic Compute Cloud (EC2) ofrece capacidad de cómputo redimensionable en la nube en forma de servidores virtuales llamados instancias.",
      "en": "Amazon Elastic Compute Cloud (EC2) provides resizable compute capacity in the cloud in the form of virtual servers called instances."
    },
    "problemSolved": {
      "es": "Elimina la necesidad de comprar y mantener hardware físico. Permite escalar la capacidad de cómputo hacia arriba o hacia abajo en minutos según la demanda.",
      "en": "Removes the need to buy and maintain physical hardware. Lets you scale compute capacity up or down in minutes based on demand."
    },
    "howItWorks": {
      "es": "El usuario elige una Amazon Machine Image (AMI) con el sistema operativo y software deseado, selecciona un tipo de instancia (combinación de CPU, memoria y red) y lanza la instancia en una región y zona de disponibilidad concretas.",
      "en": "The user picks an Amazon Machine Image (AMI) with the desired OS and software, chooses an instance type (a mix of CPU, memory and networking) and launches the instance in a specific region and availability zone."
    },
    "features": {
      "es": ["Múltiples familias y tamaños de instancia", "Auto Scaling Groups para escalar automáticamente", "Elastic Load Balancing integrado", "Instancias On-Demand, Reservadas y Spot"],
      "en": ["Multiple instance families and sizes", "Auto Scaling Groups for automatic scaling", "Integrated Elastic Load Balancing", "On-Demand, Reserved and Spot instances"]
    },
    "useCases": {
      "es": ["Alojar aplicaciones web y APIs", "Procesamiento por lotes", "Entornos de desarrollo y prueba", "Cargas de trabajo que requieren control total del sistema operativo"],
      "en": ["Hosting web apps and APIs", "Batch processing", "Dev/test environments", "Workloads that need full OS-level control"]
    },
    "integrations": {
      "es": ["Elastic Load Balancing", "Auto Scaling", "Amazon VPC", "Amazon CloudWatch", "AWS IAM"],
      "en": ["Elastic Load Balancing", "Auto Scaling", "Amazon VPC", "Amazon CloudWatch", "AWS IAM"]
    },
    "whenToUse": {
      "es": "Cuando necesitas control granular sobre el sistema operativo, el runtime o dependencias específicas, o cuando migras aplicaciones existentes sin rediseñarlas.",
      "en": "When you need granular control over the OS, runtime or specific dependencies, or when migrating existing apps without redesigning them."
    },
    "whenNotToUse": {
      "es": "Si tu carga de trabajo es event-driven y de corta duración, un servicio serverless como AWS Lambda suele ser más simple y económico.",
      "en": "If your workload is event-driven and short-lived, a serverless service like AWS Lambda is usually simpler and cheaper."
    },
    "architectureNotes": {
      "es": "Distribuir instancias en varias zonas de disponibilidad detrás de un balanceador de carga mejora la resiliencia. Usar Auto Scaling ayuda a mantener el rendimiento ante picos de tráfico.",
      "en": "Spreading instances across multiple availability zones behind a load balancer improves resiliency. Auto Scaling helps sustain performance during traffic spikes."
    },
    "costNotes": {
      "es": "Se cobra por tiempo de uso de la instancia (por segundo u hora según el tipo). Las instancias Reservadas o Savings Plans reducen el costo para cargas estables; las Spot reducen el costo para cargas tolerantes a interrupciones.",
      "en": "Billed by instance usage time (per second or hour depending on type). Reserved Instances or Savings Plans lower cost for steady workloads; Spot Instances lower cost for interruption-tolerant workloads."
    }
  },
  {
    "id": "s3",
    "name": "Amazon S3",
    "shortName": "S3",
    "category": "Storage",
    "categoryLabel": { "es": "Almacenamiento", "en": "Storage" },
    "color": "storage",
    "description": {
      "es": "Amazon Simple Storage Service (S3) es un servicio de almacenamiento de objetos con alta durabilidad, disponibilidad y escalabilidad prácticamente ilimitada.",
      "en": "Amazon Simple Storage Service (S3) is an object storage service built for high durability, availability and virtually unlimited scalability."
    },
    "problemSolved": {
      "es": "Resuelve la necesidad de almacenar y recuperar cualquier cantidad de datos, desde cualquier lugar, sin gestionar infraestructura de almacenamiento propia.",
      "en": "Solves the need to store and retrieve any amount of data, from anywhere, without managing your own storage infrastructure."
    },
    "howItWorks": {
      "es": "Los datos se guardan como objetos dentro de contenedores llamados buckets. Cada objeto tiene una clave única, metadatos y pertenece a una clase de almacenamiento que determina costo y disponibilidad.",
      "en": "Data is stored as objects inside containers called buckets. Each object has a unique key, metadata and belongs to a storage class that determines cost and availability."
    },
    "features": {
      "es": ["Durabilidad del 99.999999999% (11 nueves)", "Clases de almacenamiento (Standard, Infrequent Access, Glacier)", "Versionado de objetos", "Reglas de ciclo de vida para mover o eliminar datos automáticamente"],
      "en": ["99.999999999% (11 nines) durability", "Storage classes (Standard, Infrequent Access, Glacier)", "Object versioning", "Lifecycle rules to move or expire data automatically"]
    },
    "useCases": {
      "es": ["Backups y recuperación ante desastres", "Alojamiento de sitios web estáticos", "Data lakes para analítica", "Distribución de contenido multimedia"],
      "en": ["Backup and disaster recovery", "Static website hosting", "Data lakes for analytics", "Media content distribution"]
    },
    "integrations": {
      "es": ["Amazon CloudFront", "AWS Lambda (triggers por eventos)", "Amazon Athena", "AWS Glue"],
      "en": ["Amazon CloudFront", "AWS Lambda (event triggers)", "Amazon Athena", "AWS Glue"]
    },
    "whenToUse": {
      "es": "Cuando necesitas almacenar archivos, backups o datasets sin preocuparte por la infraestructura subyacente ni por límites de capacidad.",
      "en": "When you need to store files, backups or datasets without worrying about the underlying infrastructure or capacity limits."
    },
    "whenNotToUse": {
      "es": "No es un sistema de archivos con baja latencia tipo bloque; para eso se usan Amazon EBS o Amazon FSx.",
      "en": "It is not a low-latency block-storage file system; for that, use Amazon EBS or Amazon FSx."
    },
    "architectureNotes": {
      "es": "Definir políticas de ciclo de vida para mover objetos poco usados a clases más económicas ayuda a controlar costos a largo plazo.",
      "en": "Defining lifecycle policies to move infrequently used objects to cheaper storage classes helps control long-term cost."
    },
    "costNotes": {
      "es": "Se cobra por GB almacenado, por solicitudes (GET/PUT) y por transferencia de datos saliente. El costo varía según la clase de almacenamiento elegida.",
      "en": "Billed by GB stored, by requests (GET/PUT) and by outbound data transfer. Cost varies by the storage class chosen."
    }
  },
  {
    "id": "rds",
    "name": "Amazon RDS",
    "shortName": "RDS",
    "category": "Database",
    "categoryLabel": { "es": "Base de datos", "en": "Database" },
    "color": "db",
    "description": {
      "es": "Amazon Relational Database Service (RDS) facilita la configuración, operación y escalado de bases de datos relacionales en la nube.",
      "en": "Amazon Relational Database Service (RDS) makes it easier to set up, operate and scale relational databases in the cloud."
    },
    "problemSolved": {
      "es": "Automatiza tareas administrativas tediosas como parcheo, backups y replicación, que consumen tiempo cuando se gestionan bases de datos manualmente.",
      "en": "Automates tedious administrative tasks like patching, backups and replication that consume time when managing databases manually."
    },
    "howItWorks": {
      "es": "El usuario elige un motor de base de datos (MySQL, PostgreSQL, MariaDB, SQL Server, Oracle) y una clase de instancia; AWS gestiona el aprovisionamiento, los backups automáticos y las actualizaciones de software.",
      "en": "The user chooses a database engine (MySQL, PostgreSQL, MariaDB, SQL Server, Oracle) and an instance class; AWS handles provisioning, automated backups and software updates."
    },
    "features": {
      "es": ["Multi-AZ para alta disponibilidad", "Read Replicas para escalar lecturas", "Backups automáticos y snapshots", "Cifrado en reposo y en tránsito"],
      "en": ["Multi-AZ for high availability", "Read Replicas to scale reads", "Automated backups and snapshots", "Encryption at rest and in transit"]
    },
    "useCases": {
      "es": ["Aplicaciones transaccionales (OLTP)", "Sistemas ERP/CRM", "Backends de aplicaciones web con datos relacionales"],
      "en": ["Transactional (OLTP) applications", "ERP/CRM systems", "Web app backends with relational data"]
    },
    "integrations": {
      "es": ["Amazon VPC", "AWS IAM (autenticación de bases de datos)", "Amazon CloudWatch", "AWS Secrets Manager"],
      "en": ["Amazon VPC", "AWS IAM (database authentication)", "Amazon CloudWatch", "AWS Secrets Manager"]
    },
    "whenToUse": {
      "es": "Cuando tu aplicación necesita un modelo de datos relacional con transacciones ACID y no quieres administrar el motor de base de datos tú mismo.",
      "en": "When your application needs a relational data model with ACID transactions and you don't want to manage the database engine yourself."
    },
    "whenNotToUse": {
      "es": "Si necesitas escalado horizontal masivo o un modelo de datos no relacional, Amazon DynamoDB suele ser más adecuado.",
      "en": "If you need massive horizontal scaling or a non-relational data model, Amazon DynamoDB is usually a better fit."
    },
    "architectureNotes": {
      "es": "Activar Multi-AZ separa el failover automático de la escalabilidad de lectura; para esto último se usan Read Replicas en la misma u otra región.",
      "en": "Enabling Multi-AZ separates automatic failover from read scalability; for the latter, use Read Replicas in the same or another region."
    },
    "costNotes": {
      "es": "El costo depende de la clase de instancia, el almacenamiento aprovisionado, las Read Replicas activas y la transferencia de datos.",
      "en": "Cost depends on the instance class, provisioned storage, active Read Replicas and data transfer."
    }
  },
  {
    "id": "lambda",
    "name": "AWS Lambda",
    "shortName": "λ",
    "category": "Compute",
    "categoryLabel": { "es": "Cómputo", "en": "Compute" },
    "color": "compute",
    "description": {
      "es": "AWS Lambda es un servicio de cómputo serverless que ejecuta código en respuesta a eventos, sin necesidad de aprovisionar ni administrar servidores.",
      "en": "AWS Lambda is a serverless compute service that runs code in response to events, without provisioning or managing servers."
    },
    "problemSolved": {
      "es": "Elimina la gestión de servidores para cargas de trabajo basadas en eventos y cobra únicamente por el tiempo de cómputo consumido.",
      "en": "Removes server management for event-driven workloads and charges only for the compute time actually consumed."
    },
    "howItWorks": {
      "es": "El desarrollador sube una función (código) que se ejecuta cuando un evento la activa (una solicitud HTTP, un archivo subido a S3, un mensaje en una cola, etc.). AWS aprovisiona el entorno de ejecución automáticamente.",
      "en": "The developer uploads a function (code) that runs when an event triggers it (an HTTP request, a file uploaded to S3, a queue message, etc.). AWS provisions the execution environment automatically."
    },
    "features": {
      "es": ["Escalado automático según el número de eventos", "Facturación por milisegundo de ejecución", "Soporta múltiples lenguajes de programación", "Integración nativa con decenas de servicios AWS"],
      "en": ["Automatic scaling based on event volume", "Billing per millisecond of execution", "Supports multiple programming languages", "Native integration with dozens of AWS services"]
    },
    "useCases": {
      "es": ["APIs backend junto con Amazon API Gateway", "Procesamiento de archivos al subirlos a S3", "Automatización y tareas programadas", "Procesamiento de streams de datos"],
      "en": ["Backend APIs together with Amazon API Gateway", "Processing files as they land in S3", "Automation and scheduled tasks", "Data stream processing"]
    },
    "integrations": {
      "es": ["Amazon API Gateway", "Amazon S3", "Amazon DynamoDB", "Amazon EventBridge", "Amazon SQS/SNS"],
      "en": ["Amazon API Gateway", "Amazon S3", "Amazon DynamoDB", "Amazon EventBridge", "Amazon SQS/SNS"]
    },
    "whenToUse": {
      "es": "Cuando la carga de trabajo es event-driven, de corta duración, y el tráfico es variable o impredecible.",
      "en": "When the workload is event-driven, short-lived, and traffic is variable or unpredictable."
    },
    "whenNotToUse": {
      "es": "Para procesos de muy larga duración o que requieren un entorno de ejecución altamente personalizado, EC2 o contenedores (ECS/EKS) pueden ser más apropiados.",
      "en": "For very long-running processes or ones that need a highly customized execution environment, EC2 or containers (ECS/EKS) may be more appropriate."
    },
    "architectureNotes": {
      "es": "Diseñar funciones pequeñas y con una sola responsabilidad (single-purpose) facilita el mantenimiento y reduce los tiempos de cold start.",
      "en": "Designing small, single-purpose functions makes maintenance easier and reduces cold-start times."
    },
    "costNotes": {
      "es": "Se cobra por número de invocaciones y por el tiempo de ejecución multiplicado por la memoria asignada. Existe una capa gratuita mensual.",
      "en": "Billed by number of invocations and execution time multiplied by allocated memory. There is a monthly free tier."
    }
  },
  {
    "id": "vpc",
    "name": "Amazon VPC",
    "shortName": "VPC",
    "category": "Networking",
    "categoryLabel": { "es": "Redes", "en": "Networking" },
    "color": "net",
    "description": {
      "es": "Amazon Virtual Private Cloud (VPC) permite crear una red virtual aislada lógicamente dentro de la nube de AWS, con control total sobre el direccionamiento IP, subredes y rutas.",
      "en": "Amazon Virtual Private Cloud (VPC) lets you create a logically isolated virtual network within the AWS cloud, with full control over IP addressing, subnets and routing."
    },
    "problemSolved": {
      "es": "Proporciona el equivalente a una red de centro de datos tradicional, pero en la nube, con aislamiento y control de tráfico entre recursos.",
      "en": "Provides the equivalent of a traditional data-center network, but in the cloud, with isolation and traffic control between resources."
    },
    "howItWorks": {
      "es": "Se define un rango de direcciones IP (CIDR), se divide en subredes públicas y privadas en distintas zonas de disponibilidad, y se controla el tráfico mediante tablas de rutas, security groups y network ACLs.",
      "en": "You define an IP address range (CIDR), split it into public and private subnets across availability zones, and control traffic with route tables, security groups and network ACLs."
    },
    "features": {
      "es": ["Subredes públicas y privadas", "Security Groups y Network ACLs", "Internet Gateway y NAT Gateway", "VPC Peering y conexiones VPN/Direct Connect"],
      "en": ["Public and private subnets", "Security Groups and Network ACLs", "Internet Gateway and NAT Gateway", "VPC Peering and VPN/Direct Connect connections"]
    },
    "useCases": {
      "es": ["Aislar cargas de trabajo de producción", "Conectar de forma privada on-premises con AWS", "Diseñar arquitecturas multi-capa (web, app, datos)"],
      "en": ["Isolating production workloads", "Privately connecting on-premises to AWS", "Designing multi-tier architectures (web, app, data)"]
    },
    "integrations": {
      "es": ["Amazon EC2", "Amazon RDS", "AWS Direct Connect", "AWS Transit Gateway"],
      "en": ["Amazon EC2", "Amazon RDS", "AWS Direct Connect", "AWS Transit Gateway"]
    },
    "whenToUse": {
      "es": "Prácticamente todos los recursos de cómputo y bases de datos de AWS se despliegan dentro de una VPC; es la base de red de cualquier arquitectura.",
      "en": "Practically all AWS compute and database resources are deployed inside a VPC; it is the networking foundation of any architecture."
    },
    "whenNotToUse": {
      "es": "No aplica: es un componente base. La decisión relevante es cómo diseñar sus subredes y reglas, no si usarla.",
      "en": "Not applicable: it's a foundational component. The relevant decision is how to design its subnets and rules, not whether to use it."
    },
    "architectureNotes": {
      "es": "Separar subredes públicas (con acceso a internet) de privadas (sin acceso directo) y usar NAT Gateway para que los recursos privados salgan a internet de forma controlada es un patrón estándar.",
      "en": "Separating public subnets (internet-facing) from private ones (no direct access), and using a NAT Gateway so private resources reach the internet in a controlled way, is a standard pattern."
    },
    "costNotes": {
      "es": "La VPC en sí no tiene costo; se cobra por componentes como NAT Gateway, Direct Connect o transferencia de datos entre zonas de disponibilidad.",
      "en": "The VPC itself has no charge; you pay for components like NAT Gateway, Direct Connect, or data transfer between availability zones."
    }
  },
  {
    "id": "iam",
    "name": "AWS IAM",
    "shortName": "IAM",
    "category": "Security",
    "categoryLabel": { "es": "Seguridad", "en": "Security" },
    "color": "sec",
    "description": {
      "es": "AWS Identity and Access Management (IAM) permite controlar de forma segura el acceso a los servicios y recursos de AWS.",
      "en": "AWS Identity and Access Management (IAM) lets you securely control access to AWS services and resources."
    },
    "problemSolved": {
      "es": "Resuelve quién puede hacer qué dentro de una cuenta de AWS, aplicando el principio de mínimo privilegio.",
      "en": "Solves who can do what within an AWS account, applying the principle of least privilege."
    },
    "howItWorks": {
      "es": "Se crean usuarios, grupos y roles a los que se adjuntan políticas en formato JSON que definen permisos explícitos de permitir o denegar sobre acciones y recursos.",
      "en": "You create users, groups and roles, and attach JSON policies to them that explicitly allow or deny actions on resources."
    },
    "features": {
      "es": ["Políticas administradas y personalizadas", "Roles para acceso temporal sin credenciales de largo plazo", "Multi-Factor Authentication (MFA)", "IAM Identity Center para acceso federado"],
      "en": ["Managed and custom policies", "Roles for temporary access without long-term credentials", "Multi-Factor Authentication (MFA)", "IAM Identity Center for federated access"]
    },
    "useCases": {
      "es": ["Dar permisos a aplicaciones que corren en EC2 o Lambda mediante roles", "Controlar el acceso de equipos de desarrollo a recursos de producción", "Cumplimiento y auditoría de accesos"],
      "en": ["Granting permissions to apps running on EC2 or Lambda via roles", "Controlling dev-team access to production resources", "Access compliance and auditing"]
    },
    "integrations": {
      "es": ["Todos los servicios de AWS dependen de IAM para autorización", "AWS Organizations", "AWS CloudTrail"],
      "en": ["Every AWS service relies on IAM for authorization", "AWS Organizations", "AWS CloudTrail"]
    },
    "whenToUse": {
      "es": "Siempre. Es el servicio base de seguridad y control de acceso de toda cuenta de AWS.",
      "en": "Always. It is the foundational security and access-control service for every AWS account."
    },
    "whenNotToUse": {
      "es": "No aplica: no usar IAM correctamente (por ejemplo usando la cuenta root para tareas diarias) es en sí mismo un riesgo de seguridad.",
      "en": "Not applicable: not using IAM correctly (e.g. using the root account for daily tasks) is itself a security risk."
    },
    "architectureNotes": {
      "es": "Usar roles en lugar de credenciales de acceso embebidas, y aplicar políticas específicas por servicio en vez de permisos administrativos amplios.",
      "en": "Use roles instead of embedded access credentials, and apply service-specific policies instead of broad administrative permissions."
    },
    "costNotes": {
      "es": "IAM no tiene costo adicional; está incluido en el uso de cualquier cuenta de AWS.",
      "en": "IAM has no additional cost; it is included with the use of any AWS account."
    }
  },
  {
    "id": "dynamodb",
    "name": "Amazon DynamoDB",
    "shortName": "DDB",
    "category": "Database",
    "categoryLabel": { "es": "Base de datos", "en": "Database" },
    "color": "db",
    "description": {
      "es": "Amazon DynamoDB es una base de datos NoSQL clave-valor y de documentos, totalmente administrada, con rendimiento de milisegundos de un solo dígito a cualquier escala.",
      "en": "Amazon DynamoDB is a fully managed NoSQL key-value and document database with single-digit millisecond performance at any scale."
    },
    "problemSolved": {
      "es": "Resuelve la necesidad de bases de datos que escalen horizontalmente de forma prácticamente ilimitada sin administrar servidores ni particionamiento manual.",
      "en": "Solves the need for databases that scale horizontally almost without limit, without managing servers or manual partitioning."
    },
    "howItWorks": {
      "es": "Los datos se organizan en tablas con una clave de partición (y opcionalmente una clave de ordenamiento). DynamoDB distribuye automáticamente los datos entre particiones según la clave.",
      "en": "Data is organized into tables with a partition key (and optionally a sort key). DynamoDB automatically distributes data across partitions based on that key."
    },
    "features": {
      "es": ["Modo de capacidad On-Demand o Provisionado", "DynamoDB Streams para reaccionar a cambios", "Replicación global multi-región", "Integración con caché DAX"],
      "en": ["On-Demand or Provisioned capacity mode", "DynamoDB Streams to react to changes", "Multi-region global replication", "Integration with DAX caching"]
    },
    "useCases": {
      "es": ["Carritos de compra y catálogos de e-commerce", "Perfiles de usuario y sesiones", "Aplicaciones de gaming con alta concurrencia", "Backends serverless junto con Lambda"],
      "en": ["Shopping carts and e-commerce catalogs", "User profiles and sessions", "High-concurrency gaming apps", "Serverless backends alongside Lambda"]
    },
    "integrations": {
      "es": ["AWS Lambda", "Amazon API Gateway", "AWS AppSync", "Amazon Kinesis"],
      "en": ["AWS Lambda", "Amazon API Gateway", "AWS AppSync", "Amazon Kinesis"]
    },
    "whenToUse": {
      "es": "Cuando el patrón de acceso a los datos es predecible (por clave) y se requiere escalado horizontal y baja latencia consistente.",
      "en": "When the data access pattern is predictable (by key) and you need horizontal scaling with consistent low latency."
    },
    "whenNotToUse": {
      "es": "Si necesitas consultas relacionales complejas con múltiples joins, un motor relacional como Amazon RDS es más adecuado.",
      "en": "If you need complex relational queries with multiple joins, a relational engine like Amazon RDS is more appropriate."
    },
    "architectureNotes": {
      "es": "Diseñar bien la clave de partición para evitar 'hot partitions' es la decisión de arquitectura más importante en DynamoDB.",
      "en": "Designing the partition key well to avoid 'hot partitions' is the single most important architecture decision in DynamoDB."
    },
    "costNotes": {
      "es": "En modo On-Demand se cobra por solicitud de lectura/escritura; en modo Provisionado se cobra por capacidad reservada, se use o no.",
      "en": "In On-Demand mode you pay per read/write request; in Provisioned mode you pay for reserved capacity whether or not it's used."
    }
  },
  {
    "id": "cloudwatch",
    "name": "Amazon CloudWatch",
    "shortName": "CW",
    "category": "Management",
    "categoryLabel": { "es": "Gestión", "en": "Management" },
    "color": "mgmt",
    "description": {
      "es": "Amazon CloudWatch es el servicio de monitoreo y observabilidad de AWS: recopila métricas, logs y eventos de los recursos y aplicaciones.",
      "en": "Amazon CloudWatch is AWS's monitoring and observability service: it collects metrics, logs and events from resources and applications."
    },
    "problemSolved": {
      "es": "Da visibilidad centralizada sobre el estado y el rendimiento de la infraestructura, permitiendo detectar y reaccionar ante problemas de forma automática.",
      "en": "Provides centralized visibility into the health and performance of infrastructure, allowing automatic detection of and reaction to problems."
    },
    "howItWorks": {
      "es": "Los servicios de AWS publican métricas automáticamente en CloudWatch; también se pueden enviar métricas y logs personalizados. Sobre esos datos se configuran alarmas y dashboards.",
      "en": "AWS services publish metrics to CloudWatch automatically; you can also send custom metrics and logs. Alarms and dashboards are configured on top of that data."
    },
    "features": {
      "es": ["Métricas y dashboards en tiempo casi real", "CloudWatch Alarms con notificaciones", "CloudWatch Logs para centralizar registros", "CloudWatch Events/EventBridge para automatización"],
      "en": ["Near real-time metrics and dashboards", "CloudWatch Alarms with notifications", "CloudWatch Logs to centralize logging", "CloudWatch Events/EventBridge for automation"]
    },
    "useCases": {
      "es": ["Monitorear uso de CPU/memoria de instancias EC2", "Alertar cuando un servicio supera un umbral de error", "Centralizar logs de aplicaciones distribuidas"],
      "en": ["Monitoring CPU/memory usage of EC2 instances", "Alerting when a service crosses an error threshold", "Centralizing logs from distributed applications"]
    },
    "integrations": {
      "es": ["Amazon SNS (notificaciones de alarmas)", "AWS Lambda (respuesta automática)", "Prácticamente todos los servicios de AWS"],
      "en": ["Amazon SNS (alarm notifications)", "AWS Lambda (automated response)", "Practically every AWS service"]
    },
    "whenToUse": {
      "es": "Siempre que se opere una carga de trabajo en producción; es la base de la observabilidad en AWS.",
      "en": "Whenever a workload runs in production; it is the foundation of observability in AWS."
    },
    "whenNotToUse": {
      "es": "No aplica como servicio base, aunque para trazas distribuidas detalladas se complementa con AWS X-Ray.",
      "en": "Not applicable as a foundational service, though for detailed distributed tracing it is complemented by AWS X-Ray."
    },
    "architectureNotes": {
      "es": "Definir alarmas accionables (que disparen una respuesta automática o notifiquen al equipo correcto) evita la fatiga de alertas.",
      "en": "Defining actionable alarms (that trigger an automated response or notify the right team) avoids alert fatigue."
    },
    "costNotes": {
      "es": "Incluye una capa gratuita de métricas básicas; se cobra por métricas personalizadas, almacenamiento de logs y número de alarmas.",
      "en": "Includes a free tier of basic metrics; you pay for custom metrics, log storage and number of alarms."
    }
  },
  {
    "id": "cloudfront",
    "name": "Amazon CloudFront",
    "shortName": "CF",
    "category": "Networking",
    "categoryLabel": { "es": "Redes", "en": "Networking" },
    "color": "net",
    "description": {
      "es": "Amazon CloudFront es una red de entrega de contenido (CDN) que distribuye datos, videos y APIs a los usuarios con baja latencia.",
      "en": "Amazon CloudFront is a content delivery network (CDN) that distributes data, video and APIs to users with low latency."
    },
    "problemSolved": {
      "es": "Reduce la latencia y la carga sobre el origen al servir contenido desde ubicaciones (edge locations) cercanas al usuario final.",
      "en": "Reduces latency and load on the origin by serving content from edge locations close to the end user."
    },
    "howItWorks": {
      "es": "CloudFront almacena en caché copias del contenido en su red global de edge locations. Cuando un usuario solicita el contenido, se le sirve desde la ubicación más cercana disponible.",
      "en": "CloudFront caches copies of content across its global network of edge locations. When a user requests content, it is served from the nearest available location."
    },
    "features": {
      "es": ["Red global de edge locations", "Integración con AWS Shield para protección DDoS", "Soporte para streaming de video", "Funciones en el edge (CloudFront Functions / Lambda@Edge)"],
      "en": ["Global network of edge locations", "Integration with AWS Shield for DDoS protection", "Video streaming support", "Edge functions (CloudFront Functions / Lambda@Edge)"]
    },
    "useCases": {
      "es": ["Acelerar sitios web y APIs", "Distribuir descargas de software", "Streaming de video bajo demanda o en vivo"],
      "en": ["Accelerating websites and APIs", "Distributing software downloads", "On-demand or live video streaming"]
    },
    "integrations": {
      "es": ["Amazon S3", "Elastic Load Balancing", "AWS WAF", "AWS Shield"],
      "en": ["Amazon S3", "Elastic Load Balancing", "AWS WAF", "AWS Shield"]
    },
    "whenToUse": {
      "es": "Cuando los usuarios están distribuidos geográficamente y se busca reducir la latencia de contenido estático o dinámico.",
      "en": "When users are geographically distributed and you want to reduce latency for static or dynamic content."
    },
    "whenNotToUse": {
      "es": "Para aplicaciones internas con usuarios en una sola región cercana al origen, el beneficio puede ser marginal.",
      "en": "For internal applications with users in a single region close to the origin, the benefit may be marginal."
    },
    "architectureNotes": {
      "es": "Configurar políticas de caché adecuadas por tipo de contenido (estático vs. dinámico) es clave para maximizar el acierto de caché.",
      "en": "Configuring appropriate cache policies per content type (static vs. dynamic) is key to maximizing cache hit rate."
    },
    "costNotes": {
      "es": "Se cobra por transferencia de datos saliente desde las edge locations y por número de solicitudes.",
      "en": "Billed by data transfer out from edge locations and by number of requests."
    }
  },
  {
    "id": "route53",
    "name": "Amazon Route 53",
    "shortName": "R53",
    "category": "Networking",
    "categoryLabel": { "es": "Redes", "en": "Networking" },
    "color": "net",
    "description": {
      "es": "Amazon Route 53 es un servicio de DNS (Domain Name System) escalable y de alta disponibilidad.",
      "en": "Amazon Route 53 is a scalable, highly available DNS (Domain Name System) service."
    },
    "problemSolved": {
      "es": "Traduce nombres de dominio legibles en direcciones IP, y permite enrutar el tráfico de forma inteligente entre distintos endpoints.",
      "en": "Translates human-readable domain names into IP addresses, and lets you route traffic intelligently between different endpoints."
    },
    "howItWorks": {
      "es": "Se crean zonas alojadas con registros DNS (A, CNAME, etc.). Route 53 responde las consultas DNS aplicando políticas de enrutamiento (simple, ponderado, por latencia, geolocalización, failover).",
      "en": "You create hosted zones with DNS records (A, CNAME, etc.). Route 53 answers DNS queries applying routing policies (simple, weighted, latency-based, geolocation, failover)."
    },
    "features": {
      "es": ["Múltiples políticas de enrutamiento", "Health checks para failover automático", "Registro de dominios", "Alta disponibilidad global"],
      "en": ["Multiple routing policies", "Health checks for automatic failover", "Domain registration", "Global high availability"]
    },
    "useCases": {
      "es": ["Enrutar usuarios a la región más cercana", "Failover automático entre sitios activos y de respaldo", "Gestionar dominios de aplicaciones"],
      "en": ["Routing users to the nearest region", "Automatic failover between active and standby sites", "Managing application domains"]
    },
    "integrations": {
      "es": ["Elastic Load Balancing", "Amazon CloudFront", "Amazon S3 (sitios web estáticos)"],
      "en": ["Elastic Load Balancing", "Amazon CloudFront", "Amazon S3 (static websites)"]
    },
    "whenToUse": {
      "es": "Para gestionar la resolución DNS de cualquier dominio o subdominio usado por una aplicación en AWS.",
      "en": "To manage DNS resolution for any domain or subdomain used by an application on AWS."
    },
    "whenNotToUse": {
      "es": "No aplica: es el servicio DNS estándar dentro de AWS para la mayoría de los casos.",
      "en": "Not applicable: it is the standard DNS service within AWS for most use cases."
    },
    "architectureNotes": {
      "es": "Combinar health checks con políticas de failover permite construir arquitecturas de recuperación ante desastres a nivel DNS.",
      "en": "Combining health checks with failover policies enables building DNS-level disaster-recovery architectures."
    },
    "costNotes": {
      "es": "Se cobra por zona alojada, por número de consultas DNS y por health checks configurados.",
      "en": "Billed by hosted zone, by number of DNS queries and by configured health checks."
    }
  },
  {
    "id": "sqs",
    "name": "Amazon SQS",
    "shortName": "SQS",
    "category": "Integration",
    "categoryLabel": { "es": "Integración", "en": "Integration" },
    "color": "ai",
    "description": {
      "es": "Amazon Simple Queue Service (SQS) es un servicio de colas de mensajes totalmente administrado que desacopla los componentes de una aplicación.",
      "en": "Amazon Simple Queue Service (SQS) is a fully managed message queuing service that decouples application components."
    },
    "problemSolved": {
      "es": "Evita que un componente falle o se sature por depender directamente de otro; los mensajes se almacenan en la cola hasta que el receptor está listo para procesarlos.",
      "en": "Prevents a component from failing or getting overloaded by depending directly on another; messages sit in the queue until the receiver is ready to process them."
    },
    "howItWorks": {
      "es": "Un productor envía mensajes a una cola; uno o varios consumidores los recuperan (poll) y los procesan, eliminándolos de la cola al finalizar.",
      "en": "A producer sends messages to a queue; one or more consumers poll and process them, deleting them from the queue when done."
    },
    "features": {
      "es": ["Colas estándar (alto rendimiento) y FIFO (orden garantizado)", "Dead-letter queues para mensajes fallidos", "Escalado automático y sin servidores"],
      "en": ["Standard (high throughput) and FIFO (guaranteed order) queues", "Dead-letter queues for failed messages", "Automatic, serverless scaling"]
    },
    "useCases": {
      "es": ["Desacoplar microservicios", "Procesar tareas en segundo plano", "Amortiguar picos de tráfico antes de un procesamiento más lento"],
      "en": ["Decoupling microservices", "Background task processing", "Buffering traffic spikes before slower downstream processing"]
    },
    "integrations": {
      "es": ["AWS Lambda", "Amazon SNS", "Amazon EC2 y ECS"],
      "en": ["AWS Lambda", "Amazon SNS", "Amazon EC2 and ECS"]
    },
    "whenToUse": {
      "es": "Cuando dos componentes de una arquitectura necesitan comunicarse de forma asíncrona y tolerante a fallos.",
      "en": "When two components of an architecture need to communicate asynchronously and in a fault-tolerant way."
    },
    "whenNotToUse": {
      "es": "Si necesitas entregar el mismo mensaje a múltiples suscriptores simultáneamente, Amazon SNS (pub/sub) es más apropiado.",
      "en": "If you need to deliver the same message to multiple subscribers simultaneously, Amazon SNS (pub/sub) is more appropriate."
    },
    "architectureNotes": {
      "es": "Configurar una dead-letter queue evita perder mensajes que fallan repetidamente y facilita su diagnóstico posterior.",
      "en": "Configuring a dead-letter queue avoids losing messages that fail repeatedly and makes later diagnosis easier."
    },
    "costNotes": {
      "es": "Se cobra por número de solicitudes (envíos, recepciones, eliminaciones) realizadas sobre la cola.",
      "en": "Billed by the number of requests (sends, receives, deletes) made against the queue."
    }
  },
  {
    "id": "sns",
    "name": "Amazon SNS",
    "shortName": "SNS",
    "category": "Integration",
    "categoryLabel": { "es": "Integración", "en": "Integration" },
    "color": "ai",
    "description": {
      "es": "Amazon Simple Notification Service (SNS) es un servicio de mensajería pub/sub totalmente administrado.",
      "en": "Amazon Simple Notification Service (SNS) is a fully managed pub/sub messaging service."
    },
    "problemSolved": {
      "es": "Permite enviar un mismo mensaje a múltiples suscriptores (colas, funciones Lambda, correos, SMS) sin que el emisor conozca a cada receptor.",
      "en": "Lets you send the same message to multiple subscribers (queues, Lambda functions, emails, SMS) without the sender knowing each receiver."
    },
    "howItWorks": {
      "es": "Se publica un mensaje en un 'topic'; SNS lo entrega automáticamente a todos los suscriptores registrados en ese topic.",
      "en": "A message is published to a 'topic'; SNS automatically delivers it to every subscriber registered on that topic."
    },
    "features": {
      "es": ["Modelo publicador/suscriptor (pub/sub)", "Múltiples protocolos de entrega (SQS, Lambda, email, SMS, HTTP)", "Filtrado de mensajes por suscriptor"],
      "en": ["Publisher/subscriber (pub/sub) model", "Multiple delivery protocols (SQS, Lambda, email, SMS, HTTP)", "Per-subscriber message filtering"]
    },
    "useCases": {
      "es": ["Enviar alertas a varios sistemas a la vez", "Notificaciones a usuarios (SMS/email)", "Fan-out de eventos hacia múltiples colas SQS"],
      "en": ["Sending alerts to several systems at once", "User notifications (SMS/email)", "Fan-out of events to multiple SQS queues"]
    },
    "integrations": {
      "es": ["Amazon SQS", "AWS Lambda", "Amazon CloudWatch (alarmas)"],
      "en": ["Amazon SQS", "AWS Lambda", "Amazon CloudWatch (alarms)"]
    },
    "whenToUse": {
      "es": "Cuando un mismo evento debe notificar o disparar acciones en varios sistemas independientes al mismo tiempo.",
      "en": "When a single event needs to notify or trigger actions in several independent systems at the same time."
    },
    "whenNotToUse": {
      "es": "Si solo hay un consumidor y necesitas que los mensajes persistan hasta ser procesados, SQS por sí solo puede bastar.",
      "en": "If there is only one consumer and you need messages to persist until processed, SQS alone may be enough."
    },
    "architectureNotes": {
      "es": "El patrón 'fan-out' (SNS publicando hacia varias colas SQS) es común para distribuir un evento a distintos flujos de procesamiento.",
      "en": "The 'fan-out' pattern (SNS publishing to several SQS queues) is common for distributing one event to different processing flows."
    },
    "costNotes": {
      "es": "Se cobra por número de publicaciones y por notificaciones entregadas, con tarifas distintas según el protocolo (SMS, email, etc.).",
      "en": "Billed by number of publishes and notifications delivered, with different rates depending on the protocol (SMS, email, etc.)."
    }
  },
  {
    "id": "ecs",
    "name": "Amazon ECS",
    "shortName": "ECS",
    "category": "Compute",
    "categoryLabel": { "es": "Cómputo", "en": "Compute" },
    "color": "compute",
    "description": {
      "es": "Amazon Elastic Container Service (ECS) es un servicio de orquestación de contenedores altamente escalable.",
      "en": "Amazon Elastic Container Service (ECS) is a highly scalable container orchestration service."
    },
    "problemSolved": {
      "es": "Facilita ejecutar, detener y administrar contenedores Docker en un clúster, sin tener que operar tu propio orquestador.",
      "en": "Makes it easier to run, stop and manage Docker containers in a cluster, without operating your own orchestrator."
    },
    "howItWorks": {
      "es": "Se define una 'task definition' que describe la imagen del contenedor y sus recursos; ECS la ejecuta sobre instancias EC2 gestionadas por el usuario o sobre AWS Fargate (sin servidores).",
      "en": "You define a 'task definition' describing the container image and its resources; ECS runs it on user-managed EC2 instances or on AWS Fargate (serverless)."
    },
    "features": {
      "es": ["Modo EC2 o modo serverless con Fargate", "Integración nativa con Elastic Load Balancing", "Escalado automático de tareas y servicios"],
      "en": ["EC2 mode or serverless mode with Fargate", "Native integration with Elastic Load Balancing", "Automatic scaling of tasks and services"]
    },
    "useCases": {
      "es": ["Migrar aplicaciones en contenedores a la nube", "Arquitecturas de microservicios", "Cargas de trabajo por lotes en contenedores"],
      "en": ["Migrating containerized applications to the cloud", "Microservices architectures", "Containerized batch workloads"]
    },
    "integrations": {
      "es": ["AWS Fargate", "Elastic Load Balancing", "Amazon ECR (registro de imágenes)"],
      "en": ["AWS Fargate", "Elastic Load Balancing", "Amazon ECR (image registry)"]
    },
    "whenToUse": {
      "es": "Cuando ya trabajas con contenedores Docker y quieres una orquestación simple e integrada nativamente con el resto de AWS.",
      "en": "When you already work with Docker containers and want simple orchestration natively integrated with the rest of AWS."
    },
    "whenNotToUse": {
      "es": "Si necesitas el estándar abierto de Kubernetes o portabilidad entre nubes, Amazon EKS es la opción más adecuada.",
      "en": "If you need the open Kubernetes standard or cross-cloud portability, Amazon EKS is the more suitable option."
    },
    "architectureNotes": {
      "es": "Usar Fargate elimina la gestión de instancias EC2 subyacentes, a cambio de un costo por vCPU/memoria ligeramente mayor.",
      "en": "Using Fargate removes the need to manage underlying EC2 instances, in exchange for a slightly higher per-vCPU/memory cost."
    },
    "costNotes": {
      "es": "En modo EC2 se paga por las instancias subyacentes; en modo Fargate se paga por vCPU y memoria asignada mientras la tarea corre.",
      "en": "In EC2 mode you pay for the underlying instances; in Fargate mode you pay for vCPU and memory allocated while the task runs."
    }
  },
  {
    "id": "eks",
    "name": "Amazon EKS",
    "shortName": "EKS",
    "category": "Compute",
    "categoryLabel": { "es": "Cómputo", "en": "Compute" },
    "color": "compute",
    "description": {
      "es": "Amazon Elastic Kubernetes Service (EKS) es un servicio administrado para ejecutar Kubernetes en AWS sin operar el plano de control.",
      "en": "Amazon Elastic Kubernetes Service (EKS) is a managed service for running Kubernetes on AWS without operating the control plane."
    },
    "problemSolved": {
      "es": "Elimina la complejidad de instalar, operar y actualizar el plano de control de Kubernetes de forma manual.",
      "en": "Removes the complexity of manually installing, operating and upgrading the Kubernetes control plane."
    },
    "howItWorks": {
      "es": "AWS administra el plano de control de Kubernetes (API server, etcd); el usuario administra los nodos worker (en EC2 o Fargate) donde corren los pods.",
      "en": "AWS manages the Kubernetes control plane (API server, etcd); the user manages the worker nodes (on EC2 or Fargate) where pods run."
    },
    "features": {
      "es": ["Compatible con herramientas estándar de Kubernetes (kubectl, Helm)", "Integración con IAM para autorización", "Soporte para nodos EC2 y Fargate"],
      "en": ["Compatible with standard Kubernetes tooling (kubectl, Helm)", "Integration with IAM for authorization", "Support for EC2 and Fargate nodes"]
    },
    "useCases": {
      "es": ["Organizaciones que ya usan Kubernetes en otros entornos", "Arquitecturas que buscan portabilidad multi-nube", "Microservicios complejos con necesidades avanzadas de orquestación"],
      "en": ["Organizations already using Kubernetes elsewhere", "Architectures aiming for multi-cloud portability", "Complex microservices with advanced orchestration needs"]
    },
    "integrations": {
      "es": ["AWS Fargate", "Amazon VPC", "AWS IAM", "Amazon ECR"],
      "en": ["AWS Fargate", "Amazon VPC", "AWS IAM", "Amazon ECR"]
    },
    "whenToUse": {
      "es": "Cuando el equipo ya tiene experiencia con Kubernetes o necesita el ecosistema y estándar abierto que este ofrece.",
      "en": "When the team already has Kubernetes experience or needs the open ecosystem and standard it provides."
    },
    "whenNotToUse": {
      "es": "Si buscas la opción más simple para orquestar contenedores dentro de AWS sin el estándar Kubernetes, Amazon ECS suele ser más sencillo.",
      "en": "If you want the simplest way to orchestrate containers within AWS without the Kubernetes standard, Amazon ECS is usually simpler."
    },
    "architectureNotes": {
      "es": "EKS añade la complejidad y flexibilidad del ecosistema Kubernetes; requiere más conocimiento operativo que ECS.",
      "en": "EKS adds the complexity and flexibility of the Kubernetes ecosystem; it requires more operational knowledge than ECS."
    },
    "costNotes": {
      "es": "Se cobra una tarifa fija por hora por clúster (plano de control), además del costo de los nodos worker (EC2 o Fargate).",
      "en": "A fixed hourly fee is charged per cluster (control plane), plus the cost of the worker nodes (EC2 or Fargate)."
    }
  },
  {
    "id": "sagemaker",
    "name": "Amazon SageMaker",
    "shortName": "SM",
    "category": "AI / ML",
    "categoryLabel": { "es": "IA / ML", "en": "AI / ML" },
    "color": "ai",
    "description": {
      "es": "Amazon SageMaker es un servicio totalmente administrado para construir, entrenar y desplegar modelos de machine learning.",
      "en": "Amazon SageMaker is a fully managed service for building, training and deploying machine learning models."
    },
    "problemSolved": {
      "es": "Unifica en una sola plataforma las herramientas necesarias para todo el ciclo de vida de un modelo de ML, que normalmente requerirían configurar por separado.",
      "en": "Unifies in a single platform the tools needed across the entire ML model lifecycle, which would otherwise require separate setup."
    },
    "howItWorks": {
      "es": "Ofrece notebooks administrados para explorar datos, infraestructura de entrenamiento gestionada que se aprovisiona bajo demanda, y endpoints administrados para servir predicciones en producción.",
      "en": "It offers managed notebooks for data exploration, managed training infrastructure provisioned on demand, and managed endpoints for serving predictions in production."
    },
    "features": {
      "es": ["Notebooks Jupyter administrados", "Entrenamiento distribuido en infraestructura elástica", "Despliegue de modelos como endpoints administrados", "SageMaker Studio como entorno unificado"],
      "en": ["Managed Jupyter notebooks", "Distributed training on elastic infrastructure", "Model deployment as managed endpoints", "SageMaker Studio as a unified environment"]
    },
    "useCases": {
      "es": ["Entrenar modelos de clasificación o regresión a escala", "Desplegar modelos de predicción en producción", "Experimentación de ciencia de datos colaborativa"],
      "en": ["Training classification or regression models at scale", "Deploying prediction models in production", "Collaborative data science experimentation"]
    },
    "integrations": {
      "es": ["Amazon S3 (datasets)", "AWS Lambda", "Amazon ECR (contenedores personalizados)"],
      "en": ["Amazon S3 (datasets)", "AWS Lambda", "Amazon ECR (custom containers)"]
    },
    "whenToUse": {
      "es": "Cuando un equipo necesita entrenar y desplegar modelos de machine learning propios a escala, sin gestionar infraestructura de GPU/CPU manualmente.",
      "en": "When a team needs to train and deploy its own machine learning models at scale, without manually managing GPU/CPU infrastructure."
    },
    "whenNotToUse": {
      "es": "Si solo necesitas consumir un modelo de IA generativa ya existente, servicios como Amazon Bedrock pueden ser más directos.",
      "en": "If you only need to consume an existing generative AI model, services like Amazon Bedrock may be more direct."
    },
    "architectureNotes": {
      "es": "Separar el entorno de experimentación (notebooks) del de entrenamiento en producción ayuda a controlar costos de cómputo.",
      "en": "Separating the experimentation environment (notebooks) from production training helps control compute costs."
    },
    "costNotes": {
      "es": "Se cobra por el tiempo de cómputo de notebooks, trabajos de entrenamiento y endpoints de inferencia activos.",
      "en": "Billed by compute time for notebooks, training jobs and active inference endpoints."
    }
  },
  {
    "id": "kms",
    "name": "AWS KMS",
    "shortName": "KMS",
    "category": "Security",
    "categoryLabel": { "es": "Seguridad", "en": "Security" },
    "color": "sec",
    "description": {
      "es": "AWS Key Management Service (KMS) permite crear y controlar claves criptográficas usadas para cifrar datos en servicios de AWS y aplicaciones propias.",
      "en": "AWS Key Management Service (KMS) lets you create and control cryptographic keys used to encrypt data across AWS services and your own applications."
    },
    "problemSolved": {
      "es": "Centraliza la gestión de claves de cifrado, evitando que cada equipo implemente su propia solución de criptografía.",
      "en": "Centralizes encryption key management, avoiding the need for each team to build its own cryptography solution."
    },
    "howItWorks": {
      "es": "Se crean claves maestras (CMKs) dentro de KMS; los servicios de AWS las usan para cifrar datos en reposo, mientras que las claves nunca salen de KMS en texto plano.",
      "en": "Master keys (CMKs) are created inside KMS; AWS services use them to encrypt data at rest, while the keys never leave KMS in plaintext."
    },
    "features": {
      "es": ["Integración nativa con S3, EBS, RDS y más", "Rotación automática de claves", "Políticas de acceso granular vía IAM", "Auditoría de uso mediante CloudTrail"],
      "en": ["Native integration with S3, EBS, RDS and more", "Automatic key rotation", "Granular access policies via IAM", "Usage auditing via CloudTrail"]
    },
    "useCases": {
      "es": ["Cifrar buckets de S3 y volúmenes EBS", "Cumplir requisitos regulatorios de cifrado", "Cifrar secretos y variables de configuración sensibles"],
      "en": ["Encrypting S3 buckets and EBS volumes", "Meeting regulatory encryption requirements", "Encrypting secrets and sensitive configuration values"]
    },
    "integrations": {
      "es": ["Amazon S3", "Amazon EBS", "Amazon RDS", "AWS Secrets Manager"],
      "en": ["Amazon S3", "Amazon EBS", "Amazon RDS", "AWS Secrets Manager"]
    },
    "whenToUse": {
      "es": "Cuando se requiere cifrar datos en reposo con control total sobre quién puede usar las claves.",
      "en": "When you need to encrypt data at rest with full control over who can use the keys."
    },
    "whenNotToUse": {
      "es": "No aplica: para la mayoría de las cargas de trabajo con datos sensibles, usar KMS es una práctica recomendada, no opcional.",
      "en": "Not applicable: for most workloads with sensitive data, using KMS is a recommended practice, not optional."
    },
    "architectureNotes": {
      "es": "Usar claves administradas por el cliente (en vez de las predeterminadas de AWS) da más control sobre políticas de rotación y acceso.",
      "en": "Using customer-managed keys (instead of AWS-default ones) gives more control over rotation and access policies."
    },
    "costNotes": {
      "es": "Se cobra una tarifa mensual por clave y por número de solicitudes de cifrado/descifrado realizadas.",
      "en": "Billed a monthly fee per key and by the number of encrypt/decrypt requests made."
    }
  }
];

window.awsServices = awsServices;