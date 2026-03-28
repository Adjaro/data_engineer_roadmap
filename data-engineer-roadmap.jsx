import { useState } from "react";

const LEVELS = [
  {
    id: "junior",
    title: "Junior",
    subtitle: "0 – 2 ans",
    color: "#22d3ee",
    accent: "#0e7490",
    icon: "🌱",
    categories: [
      {
        name: "SQL & Bases de données",
        skills: [
          { name: "SQL (SELECT, JOIN, GROUP BY, Window Functions)", critical: true },
          { name: "PostgreSQL / MySQL – modélisation relationnelle", critical: true },
          { name: "Indexation, optimisation de requêtes basiques", critical: false },
          { name: "NoSQL : MongoDB ou Redis (notions)", critical: false },
        ],
      },
      {
        name: "Python pour la Data",
        skills: [
          { name: "Python 3 : syntaxe, structures, OOP", critical: true },
          { name: "Pandas, NumPy – manipulation de données", critical: true },
          { name: "Scripting ETL basique (lire CSV, API, écrire en BDD)", critical: true },
          { name: "Tests unitaires (pytest)", critical: false },
        ],
      },
      {
        name: "Outils & Environnement",
        skills: [
          { name: "Git & GitHub / GitLab (branches, PR, merge)", critical: true },
          { name: "Linux / Bash – commandes essentielles", critical: true },
          { name: "Docker – conteneuriser un script", critical: false },
          { name: "IDE : VS Code, Jupyter Notebooks", critical: false },
        ],
      },
      {
        name: "Cloud (Initiation)",
        skills: [
          { name: "AWS S3 / GCS – stockage objet", critical: true },
          { name: "BigQuery ou Redshift – requêtage basique", critical: false },
          { name: "IAM – comprendre rôles & permissions", critical: false },
        ],
      },
      {
        name: "Pipelines & Orchestration",
        skills: [
          { name: "Cron jobs / scripts planifiés", critical: true },
          { name: "Apache Airflow – créer un DAG simple", critical: true },
          { name: "ETL vs ELT – comprendre la différence", critical: false },
        ],
      },
      {
        name: "Soft Skills",
        skills: [
          { name: "Documenter son code et ses pipelines", critical: true },
          { name: "Communiquer avec les analystes / DS", critical: false },
          { name: "Curiosité & veille technologique", critical: false },
        ],
      },
    ],
  },
  {
    id: "mid",
    title: "Confirmé",
    subtitle: "2 – 5 ans",
    color: "#a78bfa",
    accent: "#6d28d9",
    icon: "⚡",
    categories: [
      {
        name: "Data Warehousing",
        skills: [
          { name: "Modélisation dimensionnelle (Star, Snowflake)", critical: true },
          { name: "dbt – transformations, tests, documentation", critical: true },
          { name: "Slowly Changing Dimensions (SCD Type 1/2)", critical: false },
          { name: "Data Vault 2.0 (notions)", critical: false },
        ],
      },
      {
        name: "Orchestration avancée",
        skills: [
          { name: "Airflow avancé (XCom, sensors, pools, SLA)", critical: true },
          { name: "Prefect ou Dagster (alternatives modernes)", critical: false },
          { name: "Gestion des erreurs, retries, alerting", critical: true },
          { name: "CI/CD pour pipelines de données", critical: true },
        ],
      },
      {
        name: "Big Data & Traitement distribué",
        skills: [
          { name: "Apache Spark (PySpark) – transformations, partitioning", critical: true },
          { name: "Formats columnar : Parquet, ORC, Avro", critical: true },
          { name: "Delta Lake / Iceberg / Hudi (Lakehouse)", critical: false },
          { name: "Databricks ou EMR", critical: false },
        ],
      },
      {
        name: "Streaming (Introduction)",
        skills: [
          { name: "Apache Kafka – producteurs, consommateurs, topics", critical: true },
          { name: "Spark Structured Streaming (notions)", critical: false },
          { name: "Différence batch vs micro-batch vs streaming", critical: true },
        ],
      },
      {
        name: "Cloud avancé",
        skills: [
          { name: "Infrastructure as Code : Terraform", critical: true },
          { name: "Kubernetes – déployer des workloads data", critical: false },
          { name: "Services managés (Glue, Dataflow, Data Factory)", critical: true },
          { name: "Monitoring : CloudWatch, Datadog, Grafana", critical: false },
        ],
      },
      {
        name: "Qualité & Gouvernance",
        skills: [
          { name: "Data Quality : Great Expectations, Soda", critical: true },
          { name: "Data Lineage & catalogues (DataHub, Atlan)", critical: false },
          { name: "RGPD / anonymisation / pseudonymisation", critical: true },
        ],
      },
    ],
  },
  {
    id: "senior",
    title: "Senior",
    subtitle: "5+ ans",
    color: "#f97316",
    accent: "#c2410c",
    icon: "🔥",
    categories: [
      {
        name: "Architecture & Design",
        skills: [
          { name: "Concevoir une Data Platform end-to-end", critical: true },
          { name: "Lakehouse Architecture (Medallion: Bronze/Silver/Gold)", critical: true },
          { name: "Data Mesh – domaines, data products, federated governance", critical: false },
          { name: "Event-Driven Architecture", critical: true },
          { name: "Choix technologiques : build vs buy, trade-offs", critical: true },
        ],
      },
      {
        name: "Streaming avancé",
        skills: [
          { name: "Kafka avancé (partitioning, exactly-once, Schema Registry)", critical: true },
          { name: "Apache Flink – traitement stateful en temps réel", critical: false },
          { name: "CDC (Change Data Capture) – Debezium", critical: true },
          { name: "Patterns : event sourcing, CQRS", critical: false },
        ],
      },
      {
        name: "Performance & Scale",
        skills: [
          { name: "Optimisation Spark (shuffles, broadcast, AQE)", critical: true },
          { name: "Cost optimization cloud (spot instances, autoscaling)", critical: true },
          { name: "Benchmarking & profiling de pipelines", critical: false },
          { name: "Multi-cloud / Hybrid architectures", critical: false },
        ],
      },
      {
        name: "MLOps & Data pour l'IA",
        skills: [
          { name: "Feature Stores (Feast, Tecton)", critical: false },
          { name: "ML Pipelines (MLflow, Kubeflow)", critical: false },
          { name: "Serving de modèles – intégration data pipelines", critical: false },
          { name: "Vector databases & RAG pipelines", critical: true },
        ],
      },
      {
        name: "Leadership technique",
        skills: [
          { name: "Mentoring juniors & code reviews", critical: true },
          { name: "Rédiger des RFCs / ADRs (Architecture Decision Records)", critical: true },
          { name: "Estimer coûts, délais, risques", critical: true },
          { name: "Présenter des choix techniques au management", critical: true },
        ],
      },
      {
        name: "Gouvernance & Stratégie",
        skills: [
          { name: "Data Contracts entre équipes", critical: true },
          { name: "Observabilité end-to-end (SLOs, SLIs pour la data)", critical: false },
          { name: "Stratégie de migration & modernisation", critical: false },
          { name: "Sécurité avancée (encryption, row-level security)", critical: true },
        ],
      },
    ],
  },
];

const CERTIFS = [
  { level: "junior", items: ["Google Cloud Digital Leader", "AWS Cloud Practitioner", "Databricks Lakehouse Fundamentals (gratuit)"] },
  { level: "mid", items: ["AWS Data Engineer Associate", "Google Professional Data Engineer", "Databricks Data Engineer Associate", "dbt Analytics Engineering Certification"] },
  { level: "senior", items: ["AWS Solutions Architect Professional", "Databricks Data Engineer Professional", "Google Professional Cloud Architect", "Confluent Certified Developer for Apache Kafka"] },
];

const PROJECTS = [
  { level: "junior", items: [
    "Pipeline ETL : API → PostgreSQL → Dashboard (Metabase)",
    "Web scraper avec stockage S3 + chargement BigQuery",
    "Automatisation de rapports CSV avec Python + Airflow",
  ]},
  { level: "mid", items: [
    "Data Warehouse complet avec dbt + Snowflake/BigQuery",
    "Pipeline Spark sur données > 1 To (logs, e-commerce)",
    "Infra data Terraform + CI/CD GitLab + monitoring",
  ]},
  { level: "senior", items: [
    "Data Platform Lakehouse (ingestion → transformation → serving)",
    "Pipeline temps réel Kafka → Flink → Dashboard live",
    "Migration legacy DWH → architecture moderne (business case)",
  ]},
];

export default function DataEngineerRoadmap() {
  const [activeLevel, setActiveLevel] = useState("junior");
  const [expandedCat, setExpandedCat] = useState(null);
  const [tab, setTab] = useState("skills");

  const level = LEVELS.find((l) => l.id === activeLevel);
  const certifs = CERTIFS.find((c) => c.level === activeLevel);
  const projects = PROJECTS.find((p) => p.level === activeLevel);

  const totalSkills = level.categories.reduce((a, c) => a + c.skills.length, 0);
  const criticalSkills = level.categories.reduce(
    (a, c) => a + c.skills.filter((s) => s.critical).length, 0
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e4e4e7",
      fontFamily: "'Instrument Sans', 'DM Sans', system-ui, sans-serif",
      padding: "0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        padding: "40px 24px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${level.color}15 0%, transparent 70%)`,
          transition: "background 0.6s ease",
        }} />
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: level.color,
          marginBottom: "8px",
          position: "relative",
          transition: "color 0.4s",
        }}>
          Roadmap complète
        </p>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 700,
          margin: "0 0 6px",
          position: "relative",
          letterSpacing: "-1px",
        }}>
          Data Engineer
        </h1>
        <p style={{
          fontSize: "15px",
          color: "#71717a",
          position: "relative",
          maxWidth: 480,
          margin: "0 auto",
        }}>
          De Junior à Senior — les compétences, certifications et projets pour chaque étape de ta carrière.
        </p>
      </div>

      {/* Level Selector */}
      <div style={{
        display: "flex",
        gap: "8px",
        padding: "0 24px",
        justifyContent: "center",
        marginBottom: "24px",
      }}>
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => { setActiveLevel(l.id); setExpandedCat(null); }}
            style={{
              flex: "1",
              maxWidth: "200px",
              padding: "14px 12px",
              borderRadius: "14px",
              border: activeLevel === l.id ? `2px solid ${l.color}` : "2px solid #27272a",
              background: activeLevel === l.id ? `${l.color}12` : "#18181b",
              color: activeLevel === l.id ? l.color : "#71717a",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "22px" }}>{l.icon}</span>
            <span style={{ fontWeight: 600, fontSize: "15px" }}>{l.title}</span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "1px",
              opacity: 0.7,
            }}>{l.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        padding: "12px 24px",
        marginBottom: "16px",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: level.color, fontFamily: "'Space Mono', monospace" }}>{totalSkills}</div>
          <div style={{ fontSize: "11px", color: "#71717a", letterSpacing: "1px", textTransform: "uppercase" }}>Compétences</div>
        </div>
        <div style={{ width: 1, background: "#27272a" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#ef4444", fontFamily: "'Space Mono', monospace" }}>{criticalSkills}</div>
          <div style={{ fontSize: "11px", color: "#71717a", letterSpacing: "1px", textTransform: "uppercase" }}>Essentielles</div>
        </div>
        <div style={{ width: 1, background: "#27272a" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#fbbf24", fontFamily: "'Space Mono', monospace" }}>{level.categories.length}</div>
          <div style={{ fontSize: "11px", color: "#71717a", letterSpacing: "1px", textTransform: "uppercase" }}>Domaines</div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex",
        gap: "0",
        margin: "0 24px 20px",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #27272a",
      }}>
        {[
          { key: "skills", label: "Compétences" },
          { key: "certifs", label: "Certifications" },
          { key: "projects", label: "Projets" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              background: tab === t.key ? level.color : "transparent",
              color: tab === t.key ? "#0a0a0f" : "#71717a",
              fontWeight: tab === t.key ? 700 : 500,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "0 24px 40px", maxWidth: 700, margin: "0 auto" }}>
        {tab === "skills" && level.categories.map((cat, ci) => {
          const isOpen = expandedCat === ci;
          return (
            <div key={ci} style={{
              marginBottom: "10px",
              borderRadius: "12px",
              border: `1px solid ${isOpen ? level.color + "44" : "#27272a"}`,
              background: isOpen ? "#18181b" : "#111113",
              overflow: "hidden",
              transition: "all 0.3s",
            }}>
              <button
                onClick={() => setExpandedCat(isOpen ? null : ci)}
                style={{
                  width: "100%",
                  padding: "16px 18px",
                  background: "none",
                  border: "none",
                  color: "#e4e4e7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  gap: "12px",
                }}
              >
                <span style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "left",
                }}>
                  {cat.name}
                </span>
                <span style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: level.color,
                    background: `${level.color}18`,
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}>
                    {cat.skills.length}
                  </span>
                  <span style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                    fontSize: "12px",
                    color: "#71717a",
                  }}>▼</span>
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 18px 16px" }}>
                  {cat.skills.map((skill, si) => (
                    <div key={si} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      padding: "8px 0",
                      borderTop: si === 0 ? `1px solid #27272a` : "none",
                    }}>
                      <span style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: skill.critical ? "#ef4444" : "#3f3f46",
                        flexShrink: 0,
                        marginTop: "5px",
                        boxShadow: skill.critical ? "0 0 8px #ef444466" : "none",
                      }} />
                      <span style={{
                        fontSize: "13px",
                        lineHeight: "18px",
                        color: skill.critical ? "#e4e4e7" : "#a1a1aa",
                      }}>
                        {skill.name}
                        {skill.critical && (
                          <span style={{
                            marginLeft: "8px",
                            fontSize: "9px",
                            fontFamily: "'Space Mono', monospace",
                            letterSpacing: "1px",
                            color: "#ef4444",
                            background: "#ef444418",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            verticalAlign: "middle",
                          }}>ESSENTIEL</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {tab === "certifs" && (
          <div style={{
            background: "#18181b",
            borderRadius: "14px",
            border: `1px solid ${level.color}33`,
            padding: "24px",
          }}>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: level.color,
              marginBottom: "16px",
              marginTop: 0,
            }}>
              Certifications recommandées — {level.title}
            </p>
            {certifs.items.map((c, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 0",
                borderBottom: i < certifs.items.length - 1 ? "1px solid #27272a" : "none",
              }}>
                <span style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: `${level.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: level.color,
                  fontFamily: "'Space Mono', monospace",
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: "14px" }}>{c}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "projects" && (
          <div style={{
            background: "#18181b",
            borderRadius: "14px",
            border: `1px solid ${level.color}33`,
            padding: "24px",
          }}>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: level.color,
              marginBottom: "16px",
              marginTop: 0,
            }}>
              Projets portfolio — {level.title}
            </p>
            {projects.items.map((p, i) => (
              <div key={i} style={{
                padding: "16px",
                borderRadius: "10px",
                background: "#0a0a0f",
                border: "1px solid #27272a",
                marginBottom: i < projects.items.length - 1 ? "10px" : 0,
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}>
                <span style={{
                  fontSize: "18px",
                  marginTop: "-2px",
                }}>{["🏗️", "🔧", "🚀"][i]}</span>
                <span style={{ fontSize: "14px", lineHeight: "20px" }}>{p}</span>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        {tab === "skills" && (
          <div style={{
            marginTop: "20px",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            fontSize: "11px",
            color: "#71717a",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef444466" }} />
              Essentiel
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3f3f46" }} />
              Recommandé
            </span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "#18181b",
      }}>
        <div style={{
          height: "100%",
          width: activeLevel === "junior" ? "33%" : activeLevel === "mid" ? "66%" : "100%",
          background: `linear-gradient(90deg, #22d3ee, #a78bfa, #f97316)`,
          transition: "width 0.6s ease",
          borderRadius: "0 2px 2px 0",
        }} />
      </div>
    </div>
  );
}
