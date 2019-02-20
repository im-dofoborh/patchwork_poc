pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    package_manager = 'yarn'
    s3_bucket = 'patchwork-sandbox'
    s3_region = 'eu-west-1'
  }

  stages {
    stage('Install') {
      steps {
        script {
          // node_8 must defined as a global tool in Jenkins configuration
          def nodeHome = tool 'node_8'
          println "nodeHome is ${nodeHome}"
          env.PATH = "${nodeHome}/bin:${env.PATH}"

          sh "${package_manager} cache clean"
          sh "${package_manager} install"
        }
      }
    }

    stage('Test'){
      steps {
        script {
          sh "${package_manager} run test"
        }
      }
    }

    stage('Build') {
      when {
        // Build when on develop
        expression {
          return env.BRANCH_NAME == 'develop'
        }
      }

      steps {
        script {
          sh "${package_manager} run generate"
        }
      }
    }

    // stage('Deploy') {
    //   when {
    //     // Deploy when on develop
    //     expression {
    //       return env.BRANCH_NAME == 'develop'
    //     }
    //   }

    //   steps {
    //     script {
    //       withCredentials([
    //         [$class: 'StringBinding', credentialsId: 'AWS_ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'],
    //         [$class: 'StringBinding', credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY']
    //       ]) {
    //         // Clear bucket
    //         sh "aws list-buckets"
    //         sh "aws s3 rm s3://${s3_bucket} --recursive --region ${s3_region}"

    //         // Deploy

    //         // If all has gone well merge develop into master
    //       }
    //     }
    //   }
    // }
  }

  post {
    always {
      // Archive coverage report
      publishHTML([
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'coverage/lcov-report',
        reportFiles: 'index.html',
        reportName: 'Coverage',
        reportTitles: 'Test Coverage'
      ])
    }
  }
}