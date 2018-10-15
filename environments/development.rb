# https://middlemanapp.com/basics/upgrade-v4/#environments-and-changes-to-configure-blocks
activate :external_pipeline,
         name: :gulp,
         command: 'yarn dev',
         source: 'build',
         latency: 1
