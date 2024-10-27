docker run \
    --name accountings-front-prod  \
    --rm \
    -d \
    -e API_URL=http://127.0.0.1:8080  \
    -e VERSION=1 \
    -e PROD=true \
    -e AWS_DEFAULT_REGION="eu-west-3" \
    -p 80:80 \
    fafosoule/accountings-front-prod:latest