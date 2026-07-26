pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '082846230300.dkr.ecr.ap-south-1.amazonaws.com'
        FRONTEND_IMAGE = "${ECR_REGISTRY}/capstone1-frontend"
        BACKEND_IMAGE = "${ECR_REGISTRY}/capstone1-backend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Eldho2827/capstone1-cicd-platform.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('sonarqube-server') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=capstone1-cicd-platform -Dsonar.sources=."
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend"
                sh "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend"
            }
        }

        stage('Push to ECR') {
            steps {
                sh """
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                    docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                """
            }
        }
stage('Deploy to Kubernetes') {
            steps {
                sh """
                    export KUBECONFIG=/var/lib/jenkins/.kube/config
                    kubectl apply -f k8s/namespace.yaml
                    kubectl apply -f k8s/mysql.yaml
                    kubectl apply -f k8s/backend.yaml
                    kubectl apply -f k8s/frontend.yaml
                    kubectl apply -f k8s/ingress.yaml
                    kubectl set image deployment/backend backend=${BACKEND_IMAGE}:${BUILD_NUMBER} -n capstone1
                    kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}:${BUILD_NUMBER} -n capstone1
                    kubectl rollout status deployment/backend -n capstone1
                    kubectl rollout status deployment/frontend -n capstone1
                """
            }
        }
    }
}