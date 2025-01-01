<template>
  <div>
    <h2>Upload Energy Consumption CSV Files</h2>
    <p>Upload CSV files with "date",Energy. No headers needed</p>
    <div class="upload-group">
      <input type="file" ref="fileInput" @change="handleFileUpload" accept=".csv" />
    </div>
    <button @click="handleSubmit">Submit</button>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import Papa from 'papaparse';

export default {
  name: 'CsvUpload',
  data() {
    return {
      file: null,
      presignedUrl: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleFileUpload(event) {
      this.file = event.target.files[0];
      if (this.file) {
        try {
          // Check if the file is empty
      if (this.file.size === 0) {
        window.alert('The selected file is empty.');
        this.file = null;
        this.$refs.fileInput.value = ''; // Clear the file input element
        return;
      }

            // Validate the CSV file
            const isValid = await this.validateCsv(this.file);
          if (!isValid) {
            window.alert('The file must have 2 columns date and a non negative number in each row. No headers needed');
            this.file = null;
            this.$refs.fileInput.value = ''; // Clear the file input element
            return;
          }

          // Retrieve the token from session storage
          const token = sessionStorage.getItem('authToken');

          // Request a pre-signed URL from the backend
          const response = await axios.get(process.env.VUE_APP_ENERGY_INPUT_UPLOAD_API_URL, {
            params: {
              fileName: this.file.name,
              fileType: this.file.type
            },
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
          });

          this.presignedUrl = response.data.url;
        } catch (error) {
          console.error('Error getting pre-signed URL:', error);
          this.successMessage = '';
          window.alert('Server failure. Please try again.');
        }
      }
    },
    async handleSubmit() {
      if (!this.file) {
        this.errorMessage = 'Please select a file to upload.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000); // Clear the message after 3 seconds
        return;
      }

      if (!this.presignedUrl) {
        this.errorMessage = 'server down. Please try again.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000); // Clear the message after 3 seconds
        return;
      }

      try {
        // Upload the file to S3 using the pre-signed URL
        await axios.put(this.presignedUrl, this.file, {
          headers: {
            'Content-Type': this.file.type
          }
        });
        console.log('File kept in cloud successfully!');

        // Retrieve the token from session storage
        const token = sessionStorage.getItem('authToken');

        // Submit the pre-signed URL to the backend
        const response = await axios.post(process.env.VUE_APP_ENERGY_INPUT_UPLOAD_API_URL, {
          s3_url: this.presignedUrl
        }, {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });

        if (response.status === 200) {
          window.alert(`File "${this.file.name}" uploaded successfully!`);
        } else if (response.status === 204) {
          window.alert('The given file is empty.');
        } else {
          window.alert(`Failed to upload file. Server response: ${response.data.message}`);
        }

        this.file = null; // Clear the file after submission
        this.presignedUrl = ''; // Clear the pre-signed URL after submission
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''; // Clear the file input element
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        this.successMessage = '';
        console.error('Error uploading file:', error);
        window.alert('Failed to upload file. Please try again.');
      }
    },
    validateCsv(file) {
      return new Promise((resolve) => {
        Papa.parse(file, {
          complete: (results) => {
            const data = results.data;
            const isValid = data.every(row => row.length === 2 && !isNaN(Date.parse(row[0])) && !isNaN(row[1]) && Number(row[1]) >= 0);
            resolve(isValid);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            resolve(false);
          }
        });
      });
    }
  }
};
</script>

<style scoped>
h2 {
  color: #42b983;
}

.upload-group {
  margin-bottom: 15px;
}

input[type="file"] {
  display: block;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #369f6e;
}

.success-message {
  color: green;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>