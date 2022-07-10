FROM python:latest AS ui-content
WORKDIR /usr/src/app
RUN pip install awscli
ARG AWS_ACCESS_KEY_ID=AKIAQUO6YEOZTSOKOL4M
ARG AWS_DEFAULT_REGION=us-east-1
RUN aws s3 cp s3://e-auction-ui/ . --recursive

FROM nginx:alpine
COPY --from=ui-content /usr/src/app/e-auction-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
