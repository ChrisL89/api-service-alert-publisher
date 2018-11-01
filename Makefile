PROJECT=api-service-alert-publisher
VERSION=latest
GIT_HASH      = $(shell git rev-parse --short HEAD)
RELEASE       = $(shell ./node_modules/.bin/release-version)
IMAGE        := $(PROJECT):$(GIT_HASH)
DEV_REPO     := retail-api-docker-dev.artifacts.tabdigital.com.au
PROD_REPO    := retail-api-docker-prod.artifacts.tabdigital.com.au

all: build

build: build-docker

build-docker: clean build_dependencies
	@echo "Now building..."
	cp ${HOME}/.npmrc .
	docker build --build-arg RELEASE_VERSION=$(RELEASE) -t $(IMAGE) -f Dockerfile .
	docker tag $(IMAGE) $(PROJECT):latest
	rm -rf .npmrc

run-docker-dev:
	docker-compose -f docker-compose.yaml up

##### CI/CD
ci-test:
	docker-compose -f docker-compose.yaml down --remove-orphans
	docker-compose -f docker-compose.yaml up -d redis
	docker-compose -f docker-compose.yaml run --rm api-service-alert-publisher npm run test:ci
	docker-compose -f docker-compose.yaml down --remove-orphans

ci-publish: build_dependencies
	@echo ">> Now pushing $(IMAGE) to $(DEV_REPO)"
	docker tag $(IMAGE) $(DEV_REPO)/$(PROJECT):$(RELEASE)
	docker push $(DEV_REPO)/$(PROJECT):$(RELEASE)

# TODO Proper promotion once integration tests have been added
ci-promote: build-docker
	@echo ">> Now promoting $(DEV_REPO)/$(PROJECT):$(RELEASE) to $(PROD_REPO)"
	docker tag $(IMAGE) $(PROD_REPO)/$(PROJECT):$(RELEASE)
	docker push $(PROD_REPO)/$(PROJECT):$(RELEASE)

##### Build Dependencies
node_modules:
	npm install

build_dependencies:
	npm install @tabdigital/release-version@^1.0.3

clean:
	rm -rf .npmrc

.PHONY: clean node_modules build_dependencies build-docker run-docker-dev ci-test ci-publish ci-promote