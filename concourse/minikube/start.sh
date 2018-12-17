#!/bin/sh

kubectl create -f ./concourse/minikube/persistence.yml
helm install --replace stable/concourse --name concourse -f ./concourse/minikube/concourse.yml --version 3