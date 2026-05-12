pipeline {

    agent any

    environment {

        DOCKER_USER = "girish8764"

        IMAGE_NAME = "node-app"

        IMAGE_TAG = "v1.${BUILD_NUMBER}"

        DEPLOY_HOST = "ubuntu@52.66.246.75"
    }

    stages {

        stage('Checkout') {

            steps {

               git branch: 'main',
               url: 'https://github.com/Girish8764/jenkins-node-app.git'
            }
        }

        stage('Build Docker Image') {

            steps {

                sh '''
                docker build -t $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Push Docker Image') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {

                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin

                    docker push $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Deploy') {

            steps {

                sshagent(['ec2-ssh-key']) {

                    sh '''

                    ssh -o StrictHostKeyChecking=no $DEPLOY_HOST << EOF

                    docker pull $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG

                    docker stop node-app || true

                    docker rm node-app || true

                    docker run -d \
                    --name node-app \
                    -p 3000:3000 \
                    $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG

                    EOF

                    '''
                }
            }
        }
    }
}
