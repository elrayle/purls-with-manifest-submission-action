# purls-with-manifest-submission-action

Submit a list of PURLs for a specific manifest name &amp; path to Dependency Snapshots API

## Usage

Create the following workflow in `.github/workflows/purls_submission.yml` to the repository that includes PURLs you want to include in your Dependency Submissions.  As written, it will run with every push a file in the `.github/workflows` directory for the repository.

```yaml
name: Dependency Submission with Manifest and PURLs

on:
  push:
    paths:
      - .github/workflows/**
  workflow_dispatch:

permissions:
  contents: write

jobs:
  submit-purls:
    runs-on: ubuntu-latest
    steps:
      - name: Submit Helm PURLs
        uses: elrayle/purls-with-manifest-submission-action@main
        with:
          # A name for the manifest 
          manifest-name: Helm
          # The filepath to the manifest including filename
          manifest-path: Chart.lock
          # The purls being submitted as part of this manifest
          purls: |-
            pkg:helm/zookeeper@13.7.3
            pkg:helm/common@2.30.0
```

## Development

### To update dependencies

```sh
npm install
```

_NOTE: If there are conflicts, you can try deleting `package-lock.json` and re-running the install command._

### Build the dist

Files under the `dist` directory are generated by running...

```sh
npm run package
```

## Acknowledgements and Gratitude

Thanks to [@hmaurer](https://github.com/hmaurer) who created [purls-submission-action](https://github.com/hmaurer/purls-submission-action).  This repo is an extension of that work.
