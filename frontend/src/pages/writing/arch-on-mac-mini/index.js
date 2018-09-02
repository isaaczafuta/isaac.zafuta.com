import React, { Component } from 'react';

import Navigation from "../../../components/layout/Navigation";
import Page from "../../../components/layout/Page";


class WritingArchOnAMacMini extends Component {

    render = () => {
        return (
            <Page title="Installing Arch on a Mac Mini">
                <Navigation/>
                <section className="hero is-danger">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Installing Arch on a Mac Mini
                            </h1>
                            <h2 className="subtitle">
                                Getting started with Arch Linux
                            </h2>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <section className="content">
                        <br/>
                        <h2>Installing Arch</h2>
                        <p>Arch Linux has some great stuff like <code>pacman</code> and the <a href="https://aur.archlinux.org/">AUR</a>, but getting it installed can be a bit tricky. The <a href="https://wiki.archlinux.org/">Arch Wiki</a> and <a href="https://wiki.archlinux.org/index.php/installation_guide">installation guide</a> are very helpful, but there are a lot of options, and I always miss something and regret it later. Here's exactly what I do to install Arch on my Late 2014 Mac Mini.</p>

                        <h4>Creating Installation Media</h4>
                        <p>Download the latest <a href="https://www.archlinux.org/download/">Arch ISO</a>, and use <code>dd</code> to put it on your installation media:</p>
                        <blockquote><code><span className="is-unselectable">$ </span>dd bs=4m if=/path/to/your.iso of=/dev/sdc</code></blockquote>

                        <h4>Boot to the Installer Image</h4>
                        <p>Hold down <code>alt</code> while booting, and you'll be able to boot from your USB installation media. In the bootloader, be sure to select the first option to boot using EFI.</p>

                        <p>Once you see a (zsh) prompt, quickly verify that you booted via EFI:</p>
                        <blockquote><code><span className="is-unselectable">$ </span>efivar -l</code></blockquote>
                        <p>If this returns a bunch of values, great, you're using EFI.</p>


                        <h4>Partitioning</h4>
                        <p>I don't expect to run out of memory on this machine, so I don't create a swap partition. If I change my mind later, I'll just create a swap file. That just leaves a partition for <code>/</code> and a partition for <code>/boot</code>to use with <a href="https://wiki.archlinux.org/index.php/systemd-boot">systemd-boot</a>.</p>

                        <p>It's worth double-checking the existing partitions with <code>lsblk</code> so you don't accidentally overwrite anything that you forgot about. Here's how my disks looked before, which makes it clear that I want to overwrite <code>/dev/sda</code>:</p>

                        <blockquote>
                            <code><span className="is-unselectable">$ </span>lsblk</code>
                            <pre>{`NAME   MAJ:MIN RM SIZE    RO TYPE MOUNTPOINT
loop   7:0     0  403M    1  loop /run/archiso/sfs/airootfs
sda    8:0     0  233,8G  0  disk
├─sda1 8:1     0  512M    0  part /boot
├─sda2 8:2     0  225,4G  0  part /
└─sda3 8:3     0  7,5G    0  part [SWAP]
sdb    8:16    1  7.5G    0  disk
├─sdb1 8:17    1  516M    0  part /run/archiso/bootmnt
└─sdb2 8:18    1  64M     0  part`}</pre>
                        </blockquote>

                        <p>We'll create the new partitions via parted:</p>
                        <blockquote><code>parted /dev/sda</code></blockquote>

                        <p>Once inside `parted`, just use `print` to see disk info:</p>
                        <blockquote>
                            <code><span className="is-unselectable">(parted) </span>print</code>
                            <pre>{`Model: ATA APPLE SSD SM0256 (scsi)
Disk /dev/sda: 251GB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
[...]`}</pre>
                        </blockquote>

                        <p>Make a brand new partition table, along with the <code>/</code> and <code>/boot</code> partitions. From here on there's no turning back, your old data is gone:</p>
                        <blockquote>
                            <code><span className="is-unselectable">(parted) </span>mklabel gpt</code>
                            <br/>
                            <code><span className="is-unselectable">(parted) </span>mkpart ESP fat32 1049kB 538MB</code>
                            <br/>
                            <code><span className="is-unselectable">(parted) </span>set 1 boot on</code>
                            <br />
                            <code><span className="is-unselectable">(parted) </span>mkpart primary btrfs 538MB 100%</code>
                            <br />
                            <code><span className="is-unselectable">(parted) </span>print</code>
                            <pre>{`Model: ATA APPLE SSD SM0256 (scsi)
Disk /dev/sda: 251GB
Secret size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags

Number  Start   End    Size   File system  Name  Flags
1       1049kB  538MB  537MB  fat32              boot, esp
2       538MB   251GB  250GB  btrfs`}</pre>
                            <code><span className="is-unselectable">(parted) </span>quit</code>
                        </blockquote>

                        <p>We'll then go ahead and write filesystems to both of those partitions:</p>
                        <blockquote>
                            <code><span className="is-unselectable">$ </span>mkfs.vfat -F32 /dev/sda1</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>mkfs.btrfs /dev/sda2</code>
                        </blockquote>

                        <h4>Installing</h4>

                        <p>Now that we're happy with our disk partitions, let's get them ready to go. We'll mount the partitions up relative to <code>/mnt</code>, which is where we'll tell the Arch installer to put the new system.</p>
                        <blockquote>
                            <code><span className="is-unselectable">$ </span>mount /dev/sda2 /mnt</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>mkdir -p /mnt/boot</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>mount /dev/sda1 /mnt/boot</code>
                        </blockquote>

                        <p>Then tell Arch to install everything to <code>/mnt</code>:</p>
                        <blockquote><code><span className="is-unselectable">$ </span>pacstrap /mnt base base-devel</code></blockquote>

                        <p>At this point I guess Arch is technically installed... But not in a very usable form. Let's write an <code>/etc/fstab</code> file so we can re-mount these filesystems like this next time:</p>
                        <blockquote><code><span className="is-unselectable">$ </span>genfstab -U -p /mnt >> /mnt/etc/fstab</code></blockquote>

                        <h4>Configuration</h4>

                        <p>Now let's do some super-basic configuring. Right now everything is under <code>/mnt</code>, so we can make things look more normal to us by using <code>arch-chroot</code>.</p>
                        <blockquote><code><span className="is-unselectable">$ </span>arch-chroot /mnt</code></blockquote>


                        <p>To set the locale, uncomment the following line from <code>/etc/locale.gen</code>:</p>
                        <blockquote>en_US.UTF-8 UTF-8</blockquote>

                        <p>Then generate the appropriate localefiles by running</p>
                        <blockquote><code><span className="is-unselectable">$ </span>locale-gen</code></blockquote>

                        <p>Make that your default when you boot, and also set it for the current session:</p>
                        <blockquote>
                            <code><span className="is-unselectable">$ </span>echo LANG=en_US.UTF-8 > /etc/locale.conf</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>export LANG=en_US.UTF-8</code>
                        </blockquote>

                        <p>Set the timezone:</p>
                        <blockquote>
                            <code><span className="is-unselectable">$ </span>unlink /etc/localtime</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>ln -s /usr/share/zoneinfo/America/Los_Angeles /etc/localtime</code>
                        </blockquote>

                        <p>Enable the hardware clock:</p>
                        <blockquote><code><span className="is-unselectable">$ </span>hwclock  —systohc —utc</code></blockquote>

                        <p>Set a hostname</p>
                        <blockquote><code><span className="is-unselectable">$ </span>echo myhostname > /etc/hostname</code></blockquote>

                        <p>Then edit <code>/etc/hosts</code> and put that same hostname as an alias for localhost:</p>
                        <blockquote>
                            <pre>{`127.0.0.1   localhost.localdomain   localhost   myhostname
::1         localhost.localdomain   localhost   myhostname`}</pre>
                        </blockquote>

                        <p>Arch has <code>dhcpcd</code> enabled by default in the install image, but it’s not installed by default. Install and enable it so we can reconnect to the network later:</p>
                        <blockquote>
                            <code><span className="is-unselectable">$ </span>pacman -S dhcpcd</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>systemctl enable dhcpcd</code>
                        </blockquote>

                        <p>Set a root password:</p>
                        <blockquote><code><span className="is-unselectable">$ </span>passwd</code></blockquote>

                        <h4>Install a bootloader</h4>

                        <p>Finally, install <code>systemd-boot</code> to <code>/boot</code>:</p>
                        <blockquote>
                            <code><span className="is-unselectable">$ </span>pacman -S dosfstools</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>bootctl --path=/boot install</code>
                        </blockquote>

                        <p>Edit <code>/boot/loader/entries/arch.conf</code>:</p>
                        <blockquote><pre>{`title Arch Linux
linux /vmlinuz-linux
initrd /initramfs-linux.img
options root=/dev/sda2 rw elevator=deadline quiet splash nmi_watchdog=0`}</pre></blockquote>

                        <p>And make that the default:</p>
                        <blockquote><code><span className="is-unselectable">$ </span>echo "default arch" > /boot/loader/loader.conf</code></blockquote>

                        <p>Exit and reboot.  That's it!</p>
                        <blockquote>
                            <code><span className="is-unselectable">$ </span>exit</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>reboot</code>
                        </blockquote>

                        <h4>Creating a user account</h4>

                        <p>The last thing everyone should do is create a user account and set the password:</p>
                        <blockquote>
                            <code><span className="is-unselectable">$ </span>useradd -m -g users -G wheel -s /bin/bash myusername</code>
                            <br />
                            <code><span className="is-unselectable">$ </span>passwd myusername</code>
                        </blockquote>

                        <p>Add yourself to <code>/etc/sudoers</code> by uncommenting this line:</p>
                        <blockquote>%wheel ALL=(ALL) ALL</blockquote>

                        <p>And finally, disable password login to <code>root</code>:</p>
                        <blockquote><code><span className="is-unselectable">$ </span>passwd -l root</code></blockquote>

                        <p>That's it! Pretty straightforward. At this point, there's no desktop environment or anything, since that's pretty much up to personal taste. I'll share my normal configurations in another post.</p>

                        <br /><br /><br /><br />

                    </section>
                </div>
            </Page>
        );
    };
}

export default WritingArchOnAMacMini;
