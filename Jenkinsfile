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
    }
}