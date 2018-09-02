# Dockerfile
FROM python:3-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy requirements.txxt
COPY requirements.txt /usr/src/app
RUN pip install -r requirements.txt

# Copy app
COPY . /usr/src/app

EXPOSE 5000

# defined in package.json
CMD [ "python", "server.py" ]
