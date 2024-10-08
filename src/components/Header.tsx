import { AppShell, Burger, Container, Group, Menu, UnstyledButton, useMantineTheme, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconLogout, IconSettings, IconUserCircle } from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import { Logo } from './Logo';
import { doSignOut } from '../firebase/auth';

const navigation = [
  { name: 'Get Care', href: '/get-care' },
  { name: 'Health Records', href: '/health-record' },
  { name: 'Messages', href: '/messages' },
  { name: 'Billing', href: '/billing' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Services', href: '/services' },
];



export function Header(): JSX.Element {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);



  return (
    <AppShell.Header>
      <Container>
        <div className={classes.inner}>
          <Center>
            <UnstyledButton className={classes.logoButton} onClick={() => navigate('/')}>
              <Logo width={240} />
            </UnstyledButton>
          </Center>
          <Group gap={20} className={classes.links}>
            {navigation.map((link) => (
              <Link key={link.name} to={link.href} className={classes.link} style={{ padding: "15px" }}>
                {link.name}
              </Link>
            ))}
          </Group>
          <Menu
            width={260}
            shadow="xl"
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                <Group gap={7}>
                  <IconUserCircle size={16} stroke={1.5} />
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconUserCircle size={16} color={theme.colors.red[6]} stroke={1.5} />}
                onClick={() => navigate('/account/profile')}
              >
                Your profile
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSettings size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                onClick={() => navigate('/account/profile')}
              >
                Settings
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout size={16} color={theme.colors.gray[6]} stroke={1.5} />}
                onClick={async () => {
                  await doSignOut();  // Ensure sign-out happens first
                  navigate('/login');      // Then navigate to the login or home page
                }}


              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </div>
      </Container>
    </AppShell.Header>
  );
}