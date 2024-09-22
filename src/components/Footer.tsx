import { Anchor, Container, Divider, SimpleGrid, Stack, Text } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer(): JSX.Element {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <Container p="xl">
          <Stack gap="xl">
            <SimpleGrid cols={3}>
              <Anchor href="https://health.rice.edu/">Rice Student Health Services Website</Anchor>
              <Anchor href="https://github.com/cathzhou/owlhealth-portal">Open Source</Anchor>
              <Anchor href="https://google.com">More Information</Anchor>
            </SimpleGrid>
            <Divider />
            <Text c="dimmed" size="sm">
              &copy; {new Date().getFullYear()} OwlHealth Portal. All rights reserved.
            </Text>
          </Stack>
        </Container>
      </div>
    </footer>
  );
}
