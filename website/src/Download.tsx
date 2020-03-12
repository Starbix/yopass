import { saveAs } from 'file-saver';
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Error from './Error';
import Form from './Form';
import { decryptMessage } from './utils';
import { useTranslation } from 'react-i18next';

const Download = () => {
  const [loading, setLoading] = useState(false);
  const [error, showError] = useState(false);
  const { key, password } = useParams();
  const { t } = useTranslation();

  const decrypt = useCallback(async () => {
    if (!password) {
      return;
    }
    setLoading(true);
    const url = process.env.REACT_APP_BACKEND_URL
      ? `${process.env.REACT_APP_BACKEND_URL}/file`
      : '/file';
    try {
      const request = await fetch(`${url}/${key}`);
      if (request.status === 200) {
        const data = await request.json();
        const file = await decryptMessage(data.message, password, 'binary');
        saveAs(
          new Blob([file.data as string], {
            type: 'application/octet-stream',
          }),
          file.filename,
        );
        setLoading(false);
        return;
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    showError(true);
  }, [password, key]);

  useEffect(() => {
    decrypt();
  }, [decrypt]);

  return (
    <div>
      {loading && (
        <h3>
          {t("Fetching from database and decrypting in browser, please hold...")}
        </h3>
      )}
      {!loading && password && !error && <DownloadSuccess />}
      <Error display={error} />
      <Form display={!password} uuid={key} prefix="f" />
    </div>
  );
};

const DownloadSuccess = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t("Downloading file and decrypting in browser, please hold...")}</h3>
      <p>{t("Make sure to download the file since it is only available once")}</p>
    </div>
  );
};
export default Download;
