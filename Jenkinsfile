pipeline {
    environment {
        BRANCH = 'ssr'
        TAG = 'latest'
        DEPLOY_TO = ''
        IMAGE_NAME = "haen-stam-front-ssr"
        DOCKERHUB_ID = "fafosoule"
        dockerHome = tool 'haenStamDocker'
        ANSIBLE_RESOURCES = 'infrastructure/ansible-resources'
        PATH = "$dockerHome/bin:$PATH"
        ANSIBLE_CONFIG = "${WORKSPACE}/${ANSIBLE_RESOURCES}/ansible.cfg"

        AWS_DEFAULT_REGION="eu-west-3"
        AWS_USERPOOLID_DEV= credentials('jenkins-aws-userpool-id-dev')
        AWS_USERPOOLWEBCLIENTID_DEV= credentials('jenkins-aws-userpool-webclientid-dev')
        AWS_USERPOOLID_PROD=""
        AWS_USERPOOLWEBCLIENTID_PROD=""
        AWS_ACCESS_KEY_ID= credentials('jenkins-aws-access-key-id')
        AWS_SECRET_ACCESS_KEY= credentials('jenkins-aws-secret-access-key')
        VERSION="0.1.0"
        VERSION_NUMBER=1
    }
    agent any
    stages {
        stage ('DELETE, CLEAN all container and images') {
            steps {
                ansiblePlaybook credentialsId: '', 
                    disableHostKeyChecking: true, 
                    extras: '-e TAG=${TAG} -e ENV=dev', 
                    installation: 'Ansible',
                    inventory: '${WORKSPACE}/${ANSIBLE_RESOURCES}/hosts.yml', 
                    playbook: '${WORKSPACE}/${ANSIBLE_RESOURCES}/playbooks/docker-clean-env.yml',
                    limit: 'api_dev'
            }
        }
        stage ('Update Hosts') {
            steps {
                ansiblePlaybook credentialsId: '', 
                    disableHostKeyChecking: true, 
                    installation: 'Ansible',
                    inventory: '${WORKSPACE}/${ANSIBLE_RESOURCES}/hosts.yml', 
                    playbook: '${WORKSPACE}/${ANSIBLE_RESOURCES}/playbooks/update_hosts.yml',
                    limit: 'front_dev, db_dev'
            }
        }
        stage ('Build Angular Server Side Rendering App Image and Push It to DockerHUB') {
            steps {
                script {
                    docker.withRegistry('', 'DOCKERHUB_PASSWORD') {
                        def dockerImage = docker.build("${DOCKERHUB_ID}/haen-stam-front-ssr:${TAG}", 
                            "--network=host -f ${env.WORKSPACE}/services/front-ssr/Dockerfile ${env.WORKSPACE}/services/front-ssr")
                        dockerImage.push();
                        dockerImage.push('latest');
                    }
                }
            }
        }
        stage('Install Ansible Roles dependencies') {
            steps {
                sh 'ansible-galaxy install -r ${WORKSPACE}/${ANSIBLE_RESOURCES}/roles/requirements.yml'
            }
        }
        stage ('INSTALL DOCKER, Docker compose if needed') {
            steps {
                ansiblePlaybook credentialsId: '', 
                    disableHostKeyChecking: true, 
                    extras: '-e TAG=${TAG} -e ENV=${DEPLOY_TO}', 
                    installation: 'Ansible',
                    inventory: '${WORKSPACE}/${ANSIBLE_RESOURCES}/hosts.yml', 
                    playbook: '${WORKSPACE}/${ANSIBLE_RESOURCES}/playbooks/install-docker.yml',
                    limit: 'front_dev, api_dev'
            }
        }
        stage ('Deploy Angular Server Side Rendering App Docker Container') {
            steps {
                ansiblePlaybook credentialsId: '', 
                    disableHostKeyChecking: true, 
                    extras: '-e TAG=${TAG} -e ENV=${DEPLOY_TO} -e AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}', 
                    installation: 'Ansible',
                    inventory: '${WORKSPACE}/${ANSIBLE_RESOURCES}/hosts.yml', 
                    playbook: '${WORKSPACE}/${ANSIBLE_RESOURCES}/playbooks/deploy_front.yml',
                    limit: 'front_dev'
            }
        }
    }
    post {
        always {
            echo 'Backend FAstAPI build'
        }
        success {
            echo 'Backend FAstAPI build Done Successfully'
        }
        failure {
            echo 'Backend FAstAPI build build Done with failure'
        }
    }
}
