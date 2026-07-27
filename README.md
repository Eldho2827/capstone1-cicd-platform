\# 🚀 Enterprise CI/CD Platform for a Three-Tier Web Application



!\[Kubernetes](https://img.shields.io/badge/Kubernetes-v1.36-326CE5?style=for-the-badge\&logo=kubernetes\&logoColor=white)

!\[Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?style=for-the-badge\&logo=jenkins\&logoColor=white)

!\[SonarQube](https://img.shields.io/badge/SonarQube-Code%20Quality-4E9BCD?style=for-the-badge\&logo=sonarqube\&logoColor=white)

!\[Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)

!\[AWS](https://img.shields.io/badge/AWS-EC2%20%7C%20ECR%20%7C%20IAM-FF9900?style=for-the-badge\&logo=amazonaws\&logoColor=white)

!\[Kubespray](https://img.shields.io/badge/Kubespray-Ansible-red?style=for-the-badge)



A production-style CI/CD platform deployed on \*\*AWS EC2\*\*, featuring \*\*Jenkins\*\*, \*\*SonarQube\*\*, \*\*Docker\*\*, \*\*Amazon ECR\*\*, and a self-managed \*\*Kubernetes cluster (Kubespray)\*\* for fully automated, zero-downtime software delivery.



\---



\# 👨‍💻 Author



Eldho Sabu



Cloud \& DevOps Engineer Aspirant focused on AWS Cloud, Kubernetes, automation, CI/CD, and monitoring solutions.



\## Profile



\- 🎓 B.Voc Information Technology Graduate

\- ☁️ AWS \& DevOps Enthusiast

\- 🚀 Hands-on experience with:

&#x20; - AWS Cloud Infrastructure

&#x20; - Kubernetes Administration

&#x20; - Docker \& Containerization

&#x20; - CI/CD Automation

&#x20; - Linux Administration

&#x20; - Monitoring \& Observability



\## Connect With Me



\- GitHub: https://github.com/Eldho2827

\- LinkedIn: www.linkedin.com/in/eldhosabu08



\---



\## 📌 Project Overview



This project demonstrates how to build a \*\*fully automated CI/CD pipeline\*\* for a three-tier web application (React + Node.js/Express + MySQL), taking source code from GitHub all the way to a zero-downtime deployment on a self-managed Kubernetes cluster.



The pipeline continuously checks out code, runs static code analysis and security scanning through SonarQube, builds versioned multi-stage Docker images, pushes them to a private Amazon ECR registry, and deploys them to Kubernetes — with rolling updates, health probes, and instant rollback.



The deployment was performed entirely on \*\*AWS EC2 instances\*\* using \*\*Kubespray\*\* for the Kubernetes cluster, and includes troubleshooting of real infrastructure issues encountered along the way — documented in detail below.



\---



\# 🏗 Architecture



```mermaid

graph TB

&#x20;   subgraph "Developer"

&#x20;       Dev\[Developer]

&#x20;   end

&#x20;   subgraph "GitHub"

&#x20;       Repo\[GitHub Repository<br/>main / dev branches + PR workflow]

&#x20;       Webhook\[Push Webhook]

&#x20;   end

&#x20;   subgraph "AWS EC2 - CI/CD Layer"

&#x20;       Jenkins\[Jenkins Server]

&#x20;       Sonar\[SonarQube Server<br/>Quality Gate]

&#x20;   end

&#x20;   subgraph "Amazon ECR"

&#x20;       ECRFront\[capstone1-frontend]

&#x20;       ECRBack\[capstone1-backend]

&#x20;   end

&#x20;   subgraph "Kubespray Kubernetes Cluster — 3 EC2 Nodes"

&#x20;       Ingress\[ingress-nginx Controller<br/>NodePort]

&#x20;       subgraph "capstone1 namespace"

&#x20;           FE1\[Frontend Pods x2]

&#x20;           BE1\[Backend Pods x2]

&#x20;           DB1\[(MySQL Pod + PVC)]

&#x20;       end

&#x20;   end

&#x20;   Dev -->|git push| Repo --> Webhook -->|triggers build| Jenkins

&#x20;   Jenkins -->|1. Scan| Sonar

&#x20;   Jenkins -->|2. Build \& Push| ECRFront

&#x20;   Jenkins -->|2. Build \& Push| ECRBack

&#x20;   Jenkins -->|3. kubectl apply / set image| Ingress

&#x20;   Ingress -->|/| FE1

&#x20;   Ingress -->|/api| BE1

&#x20;   BE1 --> DB1

&#x20;   ECRFront -.->|image pull via IAM role| FE1

&#x20;   ECRBack -.->|image pull via IAM role| BE1

```



\---



\# 📷 Project Screenshots



\## AWS Infrastructure



| IAM Role for ECR Access | ECR Repositories |

|--------------|-----------------|

| !\[](screenshots/p1-iam-role.png) | !\[](screenshots/p1-ecr-repos.png) |



| 5 EC2 Instances Running | Security Group Rules |

|--------------|-----------------|

| !\[](screenshots/p1-ec2-running.png) | !\[](screenshots/p1-sg-rules.png) |



\---



\## Kubernetes Cluster



| Kubespray Bringing Up the Cluster | 3-Node Cluster Ready |

|-------|-------------|

| !\[](screenshots/p2-kubespray-cloned.png) | !\[](screenshots/p2-cluster-ready.png) |



\---



\## CI/CD Tooling



| Jenkins Dashboard | SonarQube Project Setup |

|---------------------|-----------------|

| !\[](screenshots/p3-jenkins-dashboard.png) | !\[](screenshots/p3-sonarqube-setup.png) |



\---



\## Pipeline Runs



| Pipeline Stage View | Full Pipeline — All 6 Stages Passing |

|-----------|--------------|

| !\[](screenshots/p5-pipeline-success.png) | !\[](screenshots/p5-full-pipeline-success.png) |



\---



\## Application \& Rollback



| App Live on Kubernetes | Verified Rollback |

|-----------|--------------|

| !\[](screenshots/p6-app-live.png) | !\[](screenshots/p6-rollback.png) |



\---



\# ✨ Features



\- GitHub source control with branching + real Pull Request workflow

\- Jenkins Declarative Pipeline (Groovy) with GitHub webhook auto-trigger

\- SonarQube static analysis — bugs, code smells, vulnerabilities, security hotspots

\- Custom Quality Gate enforcing zero new bugs/vulnerabilities on every build

\- Multi-stage Docker builds — small images, non-root users

\- Amazon ECR registry — IAM role authentication, zero static credentials

\- Self-healing pipeline — auto-refreshes expiring ECR pull secrets on every deploy

\- Kubernetes Deployments, Services, ConfigMaps, Secrets, Ingress, PVC

\- Resource requests/limits and readiness/liveness probes on every container

\- Verified zero-downtime rolling updates

\- Verified one-command rollback

\- Production-style DevOps pipeline, built and debugged from scratch



\---



\# 🛠 Tech Stack



\- AWS EC2, IAM, Security Groups

\- Ubuntu 24.04

\- Kubernetes v1.36

\- Kubespray

\- Ansible

\- ingress-nginx

\- Jenkins (Groovy Declarative Pipeline)

\- SonarQube Community

\- Docker

\- Amazon ECR

\- React

\- Node.js / Express

\- MySQL 8.0



\---



\# 📊 Components



| Component | Purpose |

|-----------|---------|

| GitHub | Source control, branching, PR workflow |

| Jenkins | CI/CD pipeline orchestration |

| SonarQube | Static code analysis \& Quality Gate |

| Docker | Multi-stage application containerization |

| Amazon ECR | Private container image registry |

| Kubespray | Self-managed Kubernetes cluster deployment |

| ingress-nginx | Path-based routing into the cluster |

| React | Frontend UI |

| Node.js / Express | Backend REST API |

| MySQL | Application database |



\---



\# 🚀 Deployment Flow



1\. Created AWS EC2 infrastructure (5 instances: 3-node K8s cluster, Jenkins, SonarQube)

2\. Configured IAM role for EC2 → ECR access, created ECR repositories

3\. Deployed Kubernetes using Kubespray across the 3 cluster nodes

4\. Installed and linked Jenkins + SonarQube (webhook-based Quality Gate reporting)

5\. Built the three-tier Todo app and validated it locally with Docker Compose

6\. Wrote the Jenkinsfile: Checkout → SonarQube → Quality Gate → Docker Build → Push to ECR → Deploy to Kubernetes

7\. Wrote Kubernetes manifests: Namespace, ConfigMap, Secret, Deployments, Services, Ingress, PVC

8\. Verified rolling updates, zero-downtime, and rollback live on the cluster

9\. Hardened the pipeline to self-heal expiring ECR tokens on every deploy



\# 📈 Pipeline Workflow



GitHub Push



↓



Jenkins Webhook Trigger



↓



SonarQube Quality Gate



↓



Docker Build \& Push to ECR



↓



Kubernetes Rolling Deployment



↓



Zero-Downtime Live App



\---



\# 🔧 Useful Commands



\## Check Kubernetes Nodes



```bash

kubectl get nodes

```



\## Check Application Pods



```bash

kubectl get pods -n capstone1

```



\## Check Rollout Status



```bash

kubectl rollout status deployment/backend -n capstone1

```



\## Trigger a Rollback



```bash

kubectl rollout undo deployment/backend -n capstone1

```



\## Refresh the ECR Pull Secret Manually



```bash

kubectl delete secret ecr-secret -n capstone1 --ignore-not-found

kubectl create secret docker-registry ecr-secret \\

&#x20; --docker-server=<account-id>.dkr.ecr.<region>.amazonaws.com \\

&#x20; --docker-username=AWS \\

&#x20; --docker-password=$(aws ecr get-login-password --region <region>) \\

&#x20; --namespace=capstone1

```



\---



\# ✅ Zero-Downtime Verification



A continuous health-check loop was run against the app throughout a live rolling restart of the backend deployment:



```

200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 ...

```



Not a single dropped request during the entire pod replacement cycle.



\---



\# 🐞 Troubleshooting



During deployment, several real production-style issues were identified and resolved:



\- Jenkins repository signature failure — Jenkins had rotated its signing key; switched to the new key and repo path

\- Jenkins service failed to start — required Java 21, only Java 17 was installed; fixed by installing and defaulting to `openjdk-21-jre`

\- SonarQube crashed on startup (`SecurityManager` deprecation) — added `-Djava.security.manager=allow` to its JVM options

\- `waitForQualityGate` timing out — no SonarQube → Jenkins webhook configured; added the webhook

\- Backend/frontend pods stuck `ImagePullBackOff` — kubelet doesn't inherit the EC2 IAM role for ECR auth; created a `docker-registry` Secret from a short-lived ECR token

\- MySQL PVC stuck `Pending` — Kubespray ships no default StorageClass; installed `local-path-provisioner`

\- Frontend loaded but API calls failed — React build had a hardcoded `localhost` API URL; switched to relative paths

\- API calls returned HTML 404s — an unnecessary Ingress `rewrite-target` annotation was mangling `/api` requests; removed it

\- Backend intermittently failed DB queries — a single long-lived MySQL connection with no reconnect logic; switched to a connection pool

\- SonarQube Quality Gate failing on IaC rules — Kubernetes manifests were missing resource requests/limits; added them to every container

\- Accidentally staged a GitHub Personal Access Token in a commit — caught by GitHub's push protection before it reached the remote; removed via `git rm --cached` and an amended commit

\- New pods failing `ImagePullBackOff` mid-pipeline — ECR tokens expire after 12 hours; made the pipeline self-healing by refreshing the pull secret on every deploy



These issues were diagnosed using Kubernetes, Docker, Jenkins, SonarQube, and Linux debugging techniques until the full pipeline ran green end-to-end.



\---



\# 📚 Lessons Learned



\- Production CI/CD is as much about registry authentication and secret lifecycle management as it is about the pipeline stages themselves

\- Kubernetes doesn't inherit cloud IAM roles automatically — image pull auth needs to be handled explicitly

\- Quality Gates should reflect a project's actual scope, not be blindly accepted at default settings

\- A rolling update is only "zero-downtime" once it's actually been verified live, not just assumed

\- Self-healing pipelines (like automatic secret refresh) prevent entire categories of future failures

\- Documenting real troubleshooting is more valuable than presenting a pipeline that "just worked"



\# 🚀 Skills Demonstrated



\- CI/CD Pipeline Design (Jenkins, Groovy)

\- Kubernetes Administration (Kubespray)

\- Static Code Analysis \& Quality Gates (SonarQube)

\- Docker Multi-Stage Builds

\- AWS IAM \& ECR Integration

\- Ingress \& Path-Based Routing

\- Rolling Updates, Health Probes, Rollback

\- Secret \& Credential Lifecycle Management

\- Linux \& Networking Troubleshooting

\- Infrastructure-as-Manifest (Kubernetes YAML)



\---



\# 📷 Final Result



✔ Three-Tier Application Live on Kubernetes



✔ Full CI/CD Pipeline Passing End-to-End



✔ SonarQube Quality Gate Enforced



✔ Zero-Downtime Rolling Updates Verified



✔ Rollback Verified



✔ Self-Healing ECR Authentication



✔ Production-Style DevOps Pipeline Ready



\---



\## ⭐ If you found this project useful, consider giving it a Star!

