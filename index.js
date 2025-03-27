import * as core from "@actions/core";
import * as github from "@actions/github";
import {
  Package,
  Snapshot,
  Manifest,
  submitSnapshot,
} from "@github/dependency-submission-toolkit";

async function run() {
  const snapshot = new Snapshot(
    {
      name: core.getInput("detector-name"),
      version: "0.0.1",
      url: "https://github.com/elrayle/purls-with-manifest-submission-action",
    },
    github.context,
    {
      correlator: `${github.context.workflow}/${github.context.job}`,
      id: github.context.runId.toString(),
    }
  );

  const manifestName = core.getInput("manifest-name");
  const manifestPath = core.getInput("manifest-path");
  const purls = core.getInput("purls").split("\n");

  const manifest = new Manifest(manifestName, manifestPath);
  purls.forEach((purl) => manifest.addDirectDependency(new Package(purl)));
  snapshot.addManifest(manifest);
  submitSnapshot(snapshot);
}

run();
