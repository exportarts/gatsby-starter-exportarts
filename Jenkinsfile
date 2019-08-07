pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr:'3'))
  }

  environment {
    HOSTING_CREDS = credentials('credential')
    HOSTING_DOMAIN = 'example.com'
    TARGET_DIR = '/httpdocs/project'
    PRISMIC_TOKEN = credentials('credential')
    DOCKER_TAG = 'project'
    DOCKERFILE_PATH = 'Dockerfile'
  }

  stages {

    stage('Build & Deploy') {
      when {
        anyOf {
          branch 'development'
          branch 'staging'
          branch 'master'
        }
      }

      steps {
        sh 'docker build \
            -t ${DOCKER_TAG}-${BRANCH_NAME} \
            --build-arg SITE_PATH=${BRANCH_NAME} \
            --build-arg DEPLOY_USER=${HOSTING_CREDS_USR} \
            --build-arg DEPLOY_PASS=${HOSTING_CREDS_PSW} \
            --build-arg HOSTING_DOMAIN=${HOSTING_DOMAIN} \
            --build-arg TARGET_DIR=${TARGET_DIR} \
            --build-arg IMAGE_LABEL=${DOCKER_TAG}-${BRANCH_NAME} \
            --build-arg PRISMIC_API_KEY=${PRISMIC_TOKEN} \
            -f ${DOCKERFILE_PATH} .'
      }
    }
  }
  post {
    always {
      sh 'docker system prune --filter "label=image=${DOCKER_TAG}-${BRANCH_NAME}" -a -f'
      deleteDir() /* clean up our workspace */
    }
  }
}
