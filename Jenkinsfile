pipeline { 

    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('Source checkout') {
            steps {
                echo 'Cloning source code is finished.'
            }
        }

        stage('Test') {
            steps {
                echo 'Cloning source test is finished.'
            }
        }

        stage('Docker build') {
            steps {
                echo 'Build dokcer image'
                sh ''' docker image build -t cbfsd-user-webapp .'''
            }
        }

        stage('Docker deploy') {
            steps {
                echo '----------------- This is a docker deploment phase ----------'
                sh '''
                (if  [ $(docker ps -a | grep cbfsd-user-webapp-container | cut -d " " -f1) ]; then \
                        echo $(docker rm -f cbfsd-user-webapp-container); \
                        echo "---------------- successfully removed cbfsd-user-webapp-container ----------------"
                     else \
                    echo OK; \
                 fi;);
                docker container run --network ecom-webapp-network --restart always --name cbfsd-user-webapp-container -p 4000:80 -d cbfsd-user-webapp
            '''
            }
        }
    }
}
