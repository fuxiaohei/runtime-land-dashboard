import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

function FsStorageForm({ data }) {
  return (
    <div className="storage-local">
      <Form.Group className="mb-3">
        <Form.Label>Local Storage Path</Form.Label>
        <Form.Control type="text" name="path" defaultValue={data.path} />
        <Form.Text className="text-muted">
          Enter the path where your project files will be stored. Need{" "}
          <strong>absolute path</strong>.
        </Form.Text>
      </Form.Group>
      <div className="text-start">
        <Button className="d-inline-block" variant="primary" type="submit">
          Update Storage Setting
        </Button>
      </div>
    </div>
  );
}

function S3StorageForm({ data }) {
  return (
    <div className="storage-s3">
      <Form.Group className="mb-3">
        <Form.Label>S3 Endpoint</Form.Label>
        <Form.Control
          name="endpoint"
          type="text"
          defaultValue={data.endpoint}
          required
        />
        <Form.Text className="text-muted">
          Enter the endpoint of your S3 storage provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>S3 Bucket</Form.Label>
        <Form.Control
          name="bucket"
          type="text"
          defaultValue={data.bucket}
          required
        />
        <Form.Text className="text-muted">
          Enter the bucket of your S3 storage provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>S3 Region</Form.Label>
        <Form.Control
          name="region"
          type="text"
          defaultValue={data.region}
          required
        />
        <Form.Text className="text-muted">
          Enter the region of your S3 storage provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Access Key ID</Form.Label>
        <Form.Control
          name="access_key_id"
          type="text"
          defaultValue={data.access_key_id}
          required
        />
        <Form.Text className="text-muted">
          Enter the access key ID of your S3 storage provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Secret Access Key</Form.Label>
        <Form.Control
          name="secret_access_key"
          type="text"
          defaultValue={data.secret_access_key}
          required
        />
        <Form.Text className="text-muted">
          Enter the secret access key of your S3 storage provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Root path</Form.Label>
        <Form.Control
          name="root_path"
          type="text"
          defaultValue={data.root_path}
          required
        />
        <Form.Text className="text-muted">
          Enter the root path to store your project's files
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Bucket Basepath</Form.Label>
        <Form.Control
          name="bucket_basepath"
          type="text"
          defaultValue={data.bucket_basepath}
          required
        />
        <Form.Text className="text-muted">
          Enter the base path to visit S3 bucket. **You need set your bucket to
          public**.
        </Form.Text>
      </Form.Group>
      <div className="text-start">
        <Button className="d-inline-block" variant="primary" type="submit">
          Update Storage Setting
        </Button>
      </div>
    </div>
  );
}

function AdminStorageForm({ data, onSubmit, isSuccess }) {
  const [storageType, setStorageType] = useState(data?.storage_type || "fs");

  const subForm = (storage_type) => {
    switch (storage_type) {
      case "fs":
        return <FsStorageForm data={data.local} />;
      case "s3":
        return <S3StorageForm data={data.s3} />;
      default:
        return <></>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    onSubmit({ typename: storageType, storage: values });
  };

  return (
    <Form
      id="storage-form"
      className="border-top mt-4 pt-4"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>Storage Provider</Form.Label>
        <Form.Select
          name="storage_type"
          type="text"
          readOnly
          defaultValue={data?.storage_type}
          onChange={(e) => setStorageType(e.target.value)}
        >
          <option value="fs">FileSystem</option>
          <option value="s3">AWS S3 Like</option>
        </Form.Select>
        <Form.Text className="text-muted">
          Select the storage provider for storing your project's files
        </Form.Text>
      </Form.Group>
      {subForm(storageType)}
      {isSuccess && (
        <Alert className="mt-4" variant="success" dismissible>
          Settings updated successfully
        </Alert>
      )}
    </Form>
  );
}

export default AdminStorageForm;
