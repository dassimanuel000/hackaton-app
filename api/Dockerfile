# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Copy all other source code files to the container
COPY . .

RUN apt-get update && apt-get upgrade -y

# Expose the port that your FastAPI application listens on (e.g., 8000)
EXPOSE 8090

# Define the command to run your FastAPI application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8090"]