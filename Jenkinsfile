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
    SENTRY_TOKEN = credentials('sentry-auth-token')
    DOCKER_TAG = 'project'
    DOCKERFILE_PATH = 'Dockerfile'
  }

  stages {

    stage('Build Only') {
      when { 
        branch 'renovate/*'
      }

      steps {
        sh 'docker build \
            -t ${DOCKER_TAG}-${BRANCH_NAME} \
            --build-arg PRISMIC_API_KEY=${PRISMIC_TOKEN} \
            --build-arg BRANCH_NAME=${BRANCH_NAME} \
            -f build-only.dockerfile .'
      }

      post {
        cleanup {
          sh "docker image rm ${DOCKER_TAG}-${BRANCH_NAME}"
        }
      }
    }
    
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
            --build-arg BRANCH_NAME=${BRANCH_NAME} \
            --build-arg DEPLOY_USER=${HOSTING_CREDS_USR} \
            --build-arg DEPLOY_PASS=${HOSTING_CREDS_PSW} \
            --build-arg HOSTING_DOMAIN=${HOSTING_DOMAIN} \
            --build-arg TARGET_DIR=${TARGET_DIR} \
            --build-arg PRISMIC_API_KEY=${PRISMIC_TOKEN} \
            -f Dockerfile .'
      }

      post {
        success {
          sh 'sh sentry-release.sh ${SENTRY_TOKEN} ${DOCKER_TAG} ${BRANCH_NAME}'
        }
        cleanup {
          sh "docker image rm ${DOCKER_TAG}-${BRANCH_NAME}"
        }
      }
    }
  }
  post {
    always {
      deleteDir()
    }
  }
}
