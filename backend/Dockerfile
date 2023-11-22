FROM python:3.8

# Install the MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

ENV PYTHONUNBUFFERED 1
RUN mkdir /my_app_dir
WORKDIR /my_app_dir
ADD requirements.txt /my_app_dir/
RUN pip install --upgrade pip && pip install -r requirements.txt
ADD . /my_app_dir/

